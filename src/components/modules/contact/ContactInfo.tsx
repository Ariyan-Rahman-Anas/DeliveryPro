import SectionContainer from '@/components/common/SectionContainer';
import { Contact2Icon, Headphones, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { Link } from 'react-router';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      content: [
        '24/7 Customer Service',
        '+1 (800) DELIVERY',
        '+1 (800) 335-4837',
      ],
      link: 'tel:+18003354837',
      linkText: 'Call Now',
    },
    {
      icon: Mail,
      title: 'Email Support',
      content: [
        'General Inquiries',
        'support@deliverypro.com',
        'Response within 2 hours',
      ],
      link: 'mailto:support@deliverypro.com',
      linkText: 'Send Email',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      content: [
        'Instant Support',
        'Available 24/7',
        'Average response: 30 seconds',
      ],
      link: '#',
      linkText: 'Start Chat',
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      content: [
        'API & Integration Help',
        'tech@deliverypro.com',
        'Mon-Fri, 9AM-6PM EST',
      ],
      link: 'mailto:tech@deliverypro.com',
      linkText: 'Get Tech Support',
    },
  ];

  return (
    <SectionContainer className="">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/12 text-primary px-4 py-2 rounded-full font-semibold mb-4">
          <Contact2Icon className="w-5 h-5" />
          <span>Reach Us</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
          Multiple Ways to Reach Us
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose the most convenient way to connect with our support team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactMethods.map(({ icon: Icon, title, content, link, linkText }, idx) => (
          <div key={idx} className="bg-white p-8 rounded-xl border border-muted-foreground/25 hover:border-primary transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 p-3 rounded-lg group-hover:text-primary group-hover:bg-primary/15 transition-colors duration-300">
                <Icon />
              </div>
              <h3 className="text-xl font-semibold ml-4">{title}</h3>
            </div>
            <div className="space-y-2">
              {content?.map((item, index) => (
                <p key={index} className="text-gray-400">
                  {item}
                </p>
              ))}
            </div>
            {link && (
              <Link
                to={link}
                className="inline-flex items-center gap-2 text-primary hover:text-primary font-medium mt-4 transition-colors"
              >
                {linkText}
                <Send className="w-4 h-4" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
export default ContactInfo;
