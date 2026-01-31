"use client";

import { supabase } from "../../lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function UploadForm() {
  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const file = (form.elements.namedItem("image") as HTMLInputElement)
      .files?.[0];

    if (!file) return;

    const safeName = file.name.replace(/\s+/g, "-");
    const path = `images/${Date.now()}-${safeName}`;

    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(path, file, {
        contentType: file.type,
      });

    if (error) {
      alert("Upload failed");
      return;
    }

    const image_url = supabase.storage.from("gallery").getPublicUrl(data.path)
      .data.publicUrl;

    const { error: dbError } = await supabase.from("photos").insert({
        title,
        image_url,
        photo_date: date,
    });

    if (dbError) {
        console.error(dbError);
        alert(dbError.message);
        return;
    }


    form.reset();
    location.reload();
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Upload New Photo</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Photo title" required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="date">Photo Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="image">Image</Label>
            <Input id="image" name="image" type="file" required />
          </div>

          <Button type="submit" className="w-full">
            Upload
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
