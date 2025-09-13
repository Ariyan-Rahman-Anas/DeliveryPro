import Contact from '@/components/modules/home/Contact';
import Features from '@/components/modules/home/Features';
import Hero from '@/components/modules/home/Hero';
import Services from '@/components/modules/home/Services';
import Stats from '@/components/modules/home/Stats';
import Testimonials from '@/components/modules/home/Testimonials';

const HomePage = () => {
  return (
    <div className="pb-24">
      <Hero />
      <Services />
      <Features />
      <Stats />
      <Testimonials />
      <Contact />
    </div>
  );
};
export default HomePage;
