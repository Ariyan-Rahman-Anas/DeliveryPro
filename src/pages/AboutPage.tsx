import AboutHero from '@/components/modules/about/AboutHero';
import CompanyStory from '@/components/modules/about/CompanyStory';
import Values from '@/components/modules/about/Values';
import Team from '../components/modules/home/Team';
import OurAwards from '@/components/modules/about/OurAwards';

const AboutPage = () => {
  return (
    <div>
      <AboutHero />
      <CompanyStory />
      <Values />
      <Team />
      <OurAwards />
    </div>
  );
};
export default AboutPage;
