import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SectionContainer from '@/components/common/SectionContainer';
import { Input } from '@/components/ui/input';
import { FormInput, Send } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
    }, 2000);
  };

  return (
    <SectionContainer className="   ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/12 text-primary px-4 py-2 rounded-full font-semibold mb-4">
            <FormInput className="w-5 h-5" />
            <span>Contact Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Send Us a Message
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className=" p-8 md:p-12 rounded-2xl border border-muted-foreground/25 hover:border-primary duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                placeholder="Enter your first name"
                required={true}
                className="py-5"
              />
              <Input
                // label="Last Name"
                placeholder="Enter your last name"
                required={true}
                className="py-5"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="email"
                placeholder="Enter your email"
                required={true}
                className="py-5"
              />
              <Input
                type="tel"
                placeholder="Enter your phone number"
                required={true}
                className="py-5"
              />
            </div>

            <div>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Textarea placeholder="Type your message here." />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="newsletter"
                className="w-4 h-4 text-primary bg-gray-900 border-gray-600 rounded focus:ring-primary"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-400">
                I'd like to receive updates about DeliveryPro services and
                promotions
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className='py-6 w-full font-semibold flex items-center gap-2'
            >
              {isSubmitting ? "Sending..." : <span>Send Message </span>}
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
};
export default ContactForm;
