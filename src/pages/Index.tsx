import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { EventsSection } from '@/components/home/EventsSection';
import { ScheduleSection } from '@/components/home/ScheduleSection';
import { GalleryPreview } from '@/components/home/GalleryPreview';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <EventsSection />
      <ScheduleSection />
      <GalleryPreview />
    </Layout>
  );
};

export default Index;
