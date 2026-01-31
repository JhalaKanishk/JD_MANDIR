import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Admin() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get("key");

  if (key !== "my-admin-123") {
    return <p>Unauthorized</p>;
  }

  const [photos, setPhotos] = useState<any[]>([]);

  // edit state
  const [openEdit, setOpenEdit] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<any>(null);
  const [newFile, setNewFile] = useState<File | null>(null);

  // add state
  const [openAdd, setOpenAdd] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addFile, setAddFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });

    setPhotos(data || []);
  }

  /* ---------- ADD PHOTO ---------- */
  async function addPhoto() {
    if (!addFile || !addTitle || !addDate) return;

    const safeName = addFile.name.replace(/\s+/g, "-");
    const path = `images/${Date.now()}-${safeName}`;

    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(path, addFile, { contentType: addFile.type });

    if (error) {
      alert(error.message);
      return;
    }

    const image_url = supabase.storage
      .from("gallery")
      .getPublicUrl(data.path).data.publicUrl;

    const { data: inserted, error: dbError } = await supabase
      .from("photos")
      .insert({
        title: addTitle,
        photo_date: addDate,
        image_url,
      })
      .select()
      .single();

    if (dbError) {
      alert(dbError.message);
      return;
    }

    setPhotos((prev) => [inserted, ...prev]);

    // reset
    setAddTitle("");
    setAddDate("");
    setAddFile(null);
    setOpenAdd(false);
  }

  /* ---------- EDIT PHOTO ---------- */
  function openEditDialog(photo: any) {
    setEditingPhoto(photo);
    setNewFile(null);
    setOpenEdit(true);
  }

  async function saveEdit() {
    let image_url = editingPhoto.image_url;

    if (newFile) {
      const safeName = newFile.name.replace(/\s+/g, "-");
      const newPath = `images/${Date.now()}-${safeName}`;

      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(newPath, newFile, { contentType: newFile.type });

      if (error) {
        alert(error.message);
        return;
      }

      image_url = supabase.storage
        .from("gallery")
        .getPublicUrl(data.path).data.publicUrl;

      const oldPath = editingPhoto.image_url.split("/gallery/")[1];
      await supabase.storage.from("gallery").remove([oldPath]);
    }

    const { error: dbError } = await supabase
      .from("photos")
      .update({
        title: editingPhoto.title,
        photo_date: editingPhoto.photo_date,
        image_url,
      })
      .eq("id", editingPhoto.id);

    if (dbError) {
      alert(dbError.message);
      return;
    }

    setPhotos((prev) =>
      prev.map((p) =>
        p.id === editingPhoto.id ? { ...editingPhoto, image_url } : p
      )
    );

    setOpenEdit(false);
    setEditingPhoto(null);
    setNewFile(null);
  }

  /* ---------- DELETE ---------- */
  async function deletePhoto(photo: any) {
    await supabase.from("photos").delete().eq("id", photo.id);

    const filePath = photo.image_url.split("/gallery/")[1];
    await supabase.storage.from("gallery").remove([filePath]);

    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      {/* ADD BUTTON */}
      <div className="mb-4">
        <Button onClick={() => setOpenAdd(true)}>Add Photo</Button>
      </div>

      {/* TABLE */}
      <table className="w-full border text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2">Image</th>
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {photos.map((photo) => (
            <tr key={photo.id} className="border-t">
              <td className="p-2">
                <img
                  src={photo.image_url}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="p-2">{photo.title}</td>
              <td className="p-2">{photo.photo_date}</td>
              <td className="p-2 flex gap-2">
                <Button size="sm" onClick={() => openEditDialog(photo)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deletePhoto(photo)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* -------- ADD DIALOG -------- */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Photo</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
              />
            </div>

            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={addDate}
                onChange={(e) => setAddDate(e.target.value)}
              />
            </div>

            <div>
              <Label>Image</Label>
              <Input
                type="file"
                onChange={(e) => setAddFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={addPhoto}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* -------- EDIT DIALOG -------- */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
          </DialogHeader>

          {editingPhoto && (
            <div className="space-y-3">
              <div>
                <Label>Title</Label>
                <Input
                  value={editingPhoto.title}
                  onChange={(e) =>
                    setEditingPhoto({
                      ...editingPhoto,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={editingPhoto.photo_date}
                  onChange={(e) =>
                    setEditingPhoto({
                      ...editingPhoto,
                      photo_date: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Replace Image</Label>
                <Input
                  type="file"
                  onChange={(e) => setNewFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
