import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import templeInterior from '@/assets/gallery/temple-interior.jpeg';
import janmashtami from '@/assets/gallery/janmashtami.jpeg';
import morningRitual from '@/assets/gallery/morning-ritual.jpeg';
import diwali from '@/assets/gallery/diwali.jpeg';
import eveningAarti from '@/assets/gallery/evening-aarti.jpg';
import radhaKrishna from '@/assets/gallery/radha-krishna.jpeg';

const galleryImages = [
  { id: 1, src: templeInterior, alt: 'Temple Interior', span: 'col-span-2 row-span-2' },
  { id: 2, src: janmashtami, alt: 'Janmashtami Celebration', span: 'col-span-1' },
  { id: 3, src: morningRitual, alt: 'Morning Ritual', span: 'col-span-1' },
  { id: 4, src: diwali, alt: 'Diwali Celebration', span: 'col-span-1' },
  { id: 5, src: eveningAarti, alt: 'Evening Aarti', span: 'col-span-1' },
  { id: 6, src: radhaKrishna, alt: 'Radha Krishna', span: 'col-span-2' },
];

export function GalleryPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Photo Gallery
          </span>
          <h2 className="section-title mb-4">
            Glimpses of <span className="text-gradient-temple">Divine Moments</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the beauty of our temple through photographs capturing 
            sacred ceremonies, festivals, and daily darshan.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${image.span} gallery-image aspect-square md:aspect-auto`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors group"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
