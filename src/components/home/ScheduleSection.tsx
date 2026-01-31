import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Sun, Sunset, Moon, Star } from 'lucide-react';

const scheduleItems = [
  {
    id: 1,
    name: 'Mangla Aarti',
    time: '5:00 AM',
    icon: Star,
    description: 'Morning awakening ceremony',
  },
  {
    id: 2,
    name: 'Shringar Aarti',
    time: '7:30 AM',
    icon: Sun,
    description: 'Decoration and offering ceremony',
  },
  {
    id: 3,
    name: 'Raj Bhog Aarti',
    time: '12:00 PM',
    icon: Clock,
    description: 'Midday offering of food',
  },
  {
    id: 4,
    name: 'Sandhya Aarti',
    time: '6:30 PM',
    icon: Sunset,
    description: 'Evening prayer ceremony',
  },
  {
    id: 5,
    name: 'Shayan Aarti',
    time: '8:30 PM',
    icon: Moon,
    description: 'Night rest ceremony',
  },
];

export function ScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-secondary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Daily Schedule
            </span>
            <h2 className="section-title mb-6">
              Temple <span className="text-gradient-temple">Aarti Timings</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Experience the divine through our daily aarti ceremonies. Each aarti 
              carries its own spiritual significance, from the gentle awakening 
              at dawn to the peaceful closing at night.
            </p>
            <a
              href="/aarti"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
            >
              View Full Schedule
              <span>→</span>
            </a>
          </motion.div>

          {/* Right - Schedule Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {scheduleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="aarti-card flex items-center gap-4 group hover:border-primary/40 transition-colors"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron to-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Time */}
                <div className="text-right">
                  <span className="font-display text-xl font-bold text-primary">
                    {item.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
