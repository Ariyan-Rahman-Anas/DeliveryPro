import SectionContainer from '@/components/common/SectionContainer';
import { FileQuestion } from 'lucide-react';
import { useState } from 'react';

const ContactFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How can I track my package?',
      answer:
        'You can track your package using our tracking number on our website, mobile app, or by calling our customer service at 1-800-DELIVERY.',
    },
    {
      question: 'What are your delivery hours?',
      answer:
        'We deliver Monday through Saturday from 8 AM to 8 PM. Sunday deliveries are available for express services in select areas.',
    },
    {
      question: 'How do I schedule a pickup?',
      answer:
        'You can schedule a pickup through our website, mobile app, or by calling us. We offer same-day pickup in most metropolitan areas.',
    },
    {
      question: 'What if my package is damaged?',
      answer:
        "If your package arrives damaged, please contact us immediately at support@deliverypro.com with photos of the damage. We'll initiate a claim process within 24 hours.",
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer international shipping to over 200 countries. Delivery times and rates vary by destination.',
    },
    {
      question: 'How do I become a DeliveryPro partner?',
      answer:
        "We're always looking for reliable partners. Please fill out our partnership form or email partnerships@deliverypro.com for more information.",
    },
  ];

  return (
    <SectionContainer className="">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2  bg-primary/12 text-primary px-4 py-2 rounded-full font-semibold mb-4">
            <FileQuestion className="w-5 h-5" />
            <span>FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quick answers to common questions about our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-muted border border-muted-foreground/20 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary/20 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <div
                  className={`transform transition-transform ${openFAQ === index ? 'rotate-45' : ''
                    }`}
                >
                  <div className="w-4 h-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-primary"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-0.5 h-3 bg-primary"></div>
                    </div>
                  </div>
                </div>
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
export default ContactFAQ;
