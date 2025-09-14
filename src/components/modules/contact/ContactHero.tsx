import SectionContainer from '@/components/common/SectionContainer';
import { CheckCircle } from 'lucide-react';

const ContactHero = () => (
  <SectionContainer className="bg-gradient-to-br from-black via-gray-900 to-black h-full md:min-h-[60vh] flex items-center justify-center ">
    <div className="text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        Get in <span className="text-primary">Touch</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Have questions about our delivery services? Need support with your
        shipment? Our expert team is here to help you 24/7.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle className="w-5 h-5" />
          <span>24/7 Support</span>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle className="w-5 h-5" />
          <span>Global Coverage</span>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle className="w-5 h-5" />
          <span>Expert Team</span>
        </div>
      </div>
    </div>
  </SectionContainer>
);
export default ContactHero;
