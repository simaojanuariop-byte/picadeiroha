import HeroSection from '@/components/common/HeroSection';
import AboutSection from '@/components/common/AboutSection';
import ServicesSection from '@/components/common/ServicesSection';
import ContactSection from '@/components/common/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
