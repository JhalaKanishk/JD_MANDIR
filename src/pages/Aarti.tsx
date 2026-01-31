import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Clock, Sun, Sunset, Moon, Star, Bell, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import aartiImage from '@/assets/aarti-ceremony.jpg';

const aartiSchedule = [
  {
    id: 1,
    name: 'Mangla Aarti',
    nameHi: 'मंगला आरती',
    time: '5:00 AM - 5:30 AM',
    icon: Star,
    description: 'The awakening ceremony where the deity is gently awakened from rest. Devotees offer prayers for an auspicious start to the day.',
    significance: 'Removes darkness and brings divine light',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 2,
    name: 'Shringar Aarti',
    nameHi: 'श्रृंगार आरती',
    time: '7:30 AM - 8:00 AM',
    icon: Sparkles,
    description: 'The deity is beautifully decorated with flowers, ornaments, and fresh attire. A visual feast of divine splendor.',
    significance: 'Celebrates divine beauty and grace',
    color: 'from-pink-500 to-rose-400',
  },
  {
    id: 3,
    name: 'Raj Bhog Aarti',
    nameHi: 'राजभोग आरती',
    time: '12:00 PM - 12:30 PM',
    icon: Sun,
    description: 'The grand midday offering includes elaborate preparations of 56 varieties of food (Chhappan Bhog) for the Lord.',
    significance: 'Offering of love through sacred food',
    color: 'from-saffron to-gold',
  },
  {
    id: 4,
    name: 'Utthapan Aarti',
    nameHi: 'उत्थापन आरती',
    time: '4:00 PM - 4:30 PM',
    icon: Bell,
    description: 'The deity awakens from afternoon rest. A brief ceremony marking the transition to evening prayers.',
    significance: 'Renewal of spiritual energy',
    color: 'from-amber-500 to-orange-400',
  },
  {
    id: 5,
    name: 'Sandhya Aarti',
    nameHi: 'संध्या आरती',
    time: '6:30 PM - 7:00 PM',
    icon: Sunset,
    description: 'The most popular evening aarti with melodious bhajans, conch shells, and bells creating a divine atmosphere.',
    significance: 'Union of day and night in divine light',
    color: 'from-orange-500 to-red-400',
  },
  {
    id: 6,
    name: 'Shayan Aarti',
    nameHi: 'शयन आरती',
    time: '8:30 PM - 9:00 PM',
    icon: Moon,
    description: 'The final ceremony of the day where the deity is prepared for rest. A peaceful conclusion to daily worship.',
    significance: 'Blessing for peaceful night',
    color: 'from-indigo-500 to-purple-600',
  },
];

function AartiCard({ aarti, index }: { aarti: typeof aartiSchedule[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="temple-card h-full overflow-hidden group">
        <CardContent className="p-0">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${aarti.color} p-6 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <aarti.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {aarti.name}
                  </h3>
                  <p className="text-white/80 text-sm">{aarti.nameHi}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-display text-2xl font-bold text-white">
                  {aarti.time.split(' - ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {aarti.description}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">{aarti.significance}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{aarti.time}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Aarti() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aartiImage}
            alt="Aarti Ceremony"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              दैनिक आरती • Daily Aarti
            </span>
            <h1 className="section-title mb-6">
              Sacred <span className="text-gradient-temple">Aarti Timings</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Experience the divine through our six daily aarti ceremonies. Each aarti 
              carries deep spiritual significance and offers devotees a unique opportunity 
              to connect with the Lord.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Aarti Cards Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aartiSchedule.map((aarti, index) => (
              <AartiCard key={aarti.id} aarti={aarti} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Live Timer Section */}
      <section className="py-16 lg:py-24 bg-secondary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aarti-card p-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center animate-glow">
                <Bell className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Next Aarti
              </h3>
              <p className="text-4xl font-display font-bold text-gradient-temple mb-4">
                Sandhya Aarti
              </p>
              <p className="text-muted-foreground mb-6">Starting at 6:30 PM</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary font-medium">Live updates coming soon</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
