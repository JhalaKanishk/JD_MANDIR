import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Star, Music, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const events = [
  {
    id: 1,
    title: 'Janmashtami Mahotsav',
    date: 'August 26, 2025',
    description: 'Grand celebration of Lord Krishna\'s birth with midnight aarti and festivities.',
    icon: Star,
    color: 'from-saffron to-gold',
  },
  {
    id: 2,
    title: 'Radha Ashtami',
    date: 'September 3, 2025',
    description: 'Divine celebration honoring Shri Radha Rani with special decorations.',
    icon: Music,
    color: 'from-pink-500 to-rose-400',
  },
  {
    id: 3,
    title: 'Sharad Purnima',
    date: 'October 13, 2025',
    description: 'Moonlit celebration with kheer offering and Raas Leela performances.',
    icon: Calendar,
    color: 'from-indigo-500 to-purple-400',
  },
  {
    id: 4,
    title: 'Govardhan Puja',
    date: 'November 2, 2025',
    description: 'Annakut celebration with 56 varieties of food offerings to the deity.',
    icon: Users,
    color: 'from-emerald-500 to-teal-400',
  },
];

export function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gradient-warm">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Upcoming Celebrations
          </span>
          <h2 className="section-title mb-4">
            Festivals & <span className="text-gradient-temple">Events</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us for sacred celebrations and festivals throughout the year. 
            Experience the divine joy and community spirit.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="temple-card h-full group cursor-pointer">
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <event.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Date */}
                  <span className="text-sm text-primary font-medium">
                    {event.date}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
