import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Heart, Building, Users, BookOpen } from 'lucide-react';
import krishnaDeity from '@/assets/krishna-deity.jpg';
import templeInterior from '@/assets/gallery/temple-interior.jpeg';

const timeline = [
  {
    year: '1850',
    title: 'Foundation Laid',
    description: 'The sacred land was identified by revered saints who felt divine energy at this location.',
  },
  {
    year: '1875',
    title: 'Temple Construction',
    description: 'Master craftsmen from Rajasthan began constructing the temple using traditional Vastu principles.',
  },
  {
    year: '1890',
    title: 'Deity Installation',
    description: 'The beautiful deities of Radha-Krishna were installed with elaborate Vedic ceremonies.',
  },
  {
    year: '1950',
    title: 'Trust Formation',
    description: 'Jagdish Temple Trust was established to manage temple affairs and community services.',
  },
  {
    year: '2000',
    title: 'Renovation',
    description: 'Major renovation restored the temple to its original glory with modern facilities.',
  },
  {
    year: 'Present',
    title: 'Serving Devotees',
    description: 'Continuing the legacy of devotion, serving thousands of devotees annually.',
  },
];

const features = [
  {
    icon: Building,
    title: 'Traditional Architecture',
    description: 'Built in the classic Nagara style with intricate stone carvings depicting scenes from Krishna Leela.',
  },
  {
    icon: Heart,
    title: 'Spiritual Programs',
    description: 'Daily aarti, weekly satsang, monthly celebrations, and annual festivals bring the community together.',
  },
  {
    icon: Users,
    title: 'Community Service',
    description: 'Free prasad distribution, educational programs, and charitable activities for the underprivileged.',
  },
  {
    icon: BookOpen,
    title: 'Vedic Learning',
    description: 'Classes on Bhagavad Gita, Sanskrit, and traditional arts keep our heritage alive.',
  },
];

export default function About() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              हमारे बारे में • About Us
            </span>
            <h1 className="section-title mb-6">
              The Sacred Story of <br />
              <span className="text-gradient-temple">Jagdish Temple</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              For over 170 years, our temple has been a beacon of spiritual light, 
              welcoming devotees from around the world to experience the divine 
              presence of Lord Krishna and Radha Rani.
            </p>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-temple max-w-4xl mx-auto"
          >
            <img
              src={templeInterior}
              alt="Temple Interior"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Deity Section */}
      <section className="py-16 lg:py-24 bg-secondary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Divine Presence
              </span>
              <h2 className="section-title mb-6">
                The Deity of <span className="text-gradient-temple">Lord Krishna</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At the heart of our temple resides the magnificent deity of Lord Krishna, 
                beautifully adorned with fresh flowers, precious ornaments, and sacred 
                vestments that change with the seasons and festivals.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The deity, crafted from rare black marble over 200 years ago, radiates 
                divine energy that devotees describe as transformative. The enchanting 
                smile and mesmerizing eyes of the Lord captivate all who seek His darshan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alongside Lord Krishna stands Radha Rani, the epitome of devotion, 
                reminding us of the eternal bond of divine love and the path of 
                surrender to the supreme.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-saffron/20 via-gold/20 to-primary/20 rounded-3xl blur-2xl" />
                <img
                  src={krishnaDeity}
                  alt="Lord Krishna Deity"
                  className="relative rounded-2xl shadow-temple w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="section-title">
              Temple <span className="text-gradient-temple">History</span>
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 timeline-dot z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-primary font-display font-bold text-xl">{item.year}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-secondary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              What We Offer
            </span>
            <h2 className="section-title">
              Temple <span className="text-gradient-temple">Services</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="temple-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-saffron to-gold flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Info */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center aarti-card p-10"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Jagdish Temple Trust
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Established in 1950, our trust is dedicated to preserving the temple's 
              heritage, serving devotees, and contributing to community welfare. 
              We are a registered charitable organization committed to transparency 
              and spiritual service.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <span className="block font-display text-3xl font-bold text-gradient-temple">170+</span>
                <span className="text-sm text-muted-foreground">Years of Service</span>
              </div>
              <div>
                <span className="block font-display text-3xl font-bold text-gradient-temple">10K+</span>
                <span className="text-sm text-muted-foreground">Daily Visitors</span>
              </div>
              <div>
                <span className="block font-display text-3xl font-bold text-gradient-temple">365</span>
                <span className="text-sm text-muted-foreground">Days Open</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
