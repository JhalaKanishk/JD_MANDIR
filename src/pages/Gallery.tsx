"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

const categories = [
  { id: "all", name: "Everyday Darshan" },
  { id: "festivals", name: "Festivals" },
  { id: "special", name: "Special Events" },
];

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  // 🔹 Fetch images from Supabase
  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("photo_date", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setPhotos(data || []);
    setLoading(false);
  }

  // 🔹 Filter using dynamic data
  const filteredGallery = useMemo(() => {
    return photos.filter((image) => {
      const categoryMatch =
        selectedCategory === "all" || image.category === selectedCategory;

      const dateMatch =
        !selectedDate ||
        image.photo_date === format(selectedDate, "yyyy-MM-dd");

      return categoryMatch && dateMatch;
    });
  }, [photos, selectedCategory, selectedDate]);

  const openLightbox = (image: any) => {
    const index = filteredGallery.findIndex((img) => img.id === image.id);
    setLightboxIndex(index);
    setSelectedImage(image);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    let newIndex =
      direction === "prev" ? lightboxIndex - 1 : lightboxIndex + 1;

    if (newIndex < 0) newIndex = filteredGallery.length - 1;
    if (newIndex >= filteredGallery.length) newIndex = 0;

    setLightboxIndex(newIndex);
    setSelectedImage(filteredGallery[newIndex]);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedDate(undefined);
  };

  const downloadImage = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              फोटो गैलरी • Photo Gallery
            </span>
            <h1 className="section-title mb-6">
              Divine <span className="text-gradient-temple">Darshan Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse temple photos by category or search by date.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 bg-card rounded-xl border shadow-card">

            {/* Category */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition",
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Date */}
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? format(selectedDate, "PPP")
                      : "Search by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarUI
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </PopoverContent>
              </Popover>

              {(selectedDate || selectedCategory !== "all") && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <p className="text-center py-20">Loading photos...</p>
          ) : filteredGallery.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No photos found</h3>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredGallery.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => openLightbox(image)}
                  >
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-sm font-medium">
                          {image.title}
                        </h3>
                        <p className="text-white/70 text-xs">
                          {format(new Date(image.photo_date), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-none">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
              />

              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
              >
                <ChevronRight />
              </button>

              <button
                onClick={() =>
                  downloadImage(
                    selectedImage.image_url,
                    `${selectedImage.title || "photo"}.jpg`
                  )
                }
                className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 rounded-lg
                          bg-white/10 text-white backdrop-blur hover:bg-white/20 transition"
              >
                <Download className="w-4 h-4" />
                Download
              </button>


              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white text-xl font-semibold">
                  {selectedImage.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {format(new Date(selectedImage.photo_date), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
