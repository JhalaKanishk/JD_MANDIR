"use client";

import { supabase } from "../../lib/supabase";

import { useEffect, useState } from "react";
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

export default function AdminTable() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<any>(null);
  const [newFile, setNewFile] = useState<File | null>(null);

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

  function openEdit(photo: any) {
    setEditingPhoto(photo);
    setNewFile(null);
    setOpen(true);
  }

  async function saveEdit() {
    let image_url = editingPhoto.image_url;

    // 🔄 IF USER SELECTED NEW IMAGE
    if (newFile) {
      const safeName = newFile.name.replace(/\s+/g, "-");
      const newPath = `images/${Date.now()}-${safeName}`;

      // 1️⃣ Upload new image
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(newPath, newFile, {
          contentType: newFile.type,
        });

      if (error) {
        alert(error.message);
        return;
      }

      image_url = supabase.storage
        .from("gallery")
        .getPublicUrl(data.path).data.publicUrl;

      // 2️⃣ Delete old image
      const oldPath = editingPhoto.image_url.split("/gallery/")[1];
      await supabase.storage.from("gallery").remove([oldPath]);
    }

    // 3️⃣ Update DB
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

    // 4️⃣ Update UI
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === editingPhoto.id
          ? { ...editingPhoto, image_url }
          : p
      )
    );

    setOpen(false);
    setEditingPhoto(null);
    setNewFile(null);
  }

  async function deletePhoto(photo: any) {
    await supabase.from("photos").delete().eq("id", photo.id);

    const filePath = photo.image_url.split("/gallery/")[1];
    await supabase.storage.from("gallery").remove([filePath]);

    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  }

  return (
    <>
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
                <Button size="sm" onClick={() => openEdit(photo)}>
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

      {/* EDIT MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
          </DialogHeader>

          {editingPhoto && (
            <div className="space-y-4">
              <div className="space-y-1">
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

              <div className="space-y-1">
                <Label>Photo Date</Label>
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

              <div className="space-y-1">
                <Label>Replace Image</Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setNewFile(e.target.files?.[0] || null)
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
