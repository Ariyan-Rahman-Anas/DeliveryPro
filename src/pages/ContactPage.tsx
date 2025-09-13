import ContactFAQ from '@/components/modules/contact/ContactFAQ';
import ContactForm from '@/components/modules/contact/ContactForm';
import ContactHero from '@/components/modules/contact/ContactHero';
import ContactInfo from '@/components/modules/contact/ContactInfo';
import OfficeLocations from '@/components/modules/contact/OfficeLocations';

const ContactPage = () => {
  return (
    <div className='bg-gray-50 space-y-16'>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <OfficeLocations />
      <ContactFAQ />
    </div>
  );
};
export default ContactPage;
