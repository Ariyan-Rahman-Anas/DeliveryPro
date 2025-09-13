import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/25 text-primary px-4 py-2 rounded-full font-semibold">
                <Phone className="w-5 h-5" />
                <span>Get Started</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold">Ready to Ship?</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Get started with our premium delivery service today. Fast,
                secure, and reliable shipping solutions await you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
                <div className="bg-primary rounded-full p-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">24/7 Customer Support</div>
                  <div className="text-gray-400">1-800-DELIVERY</div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
                <div className="bg-primary rounded-full p-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Email Support</div>
                  <div className="text-gray-400">support@deliveryapp.com</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="px-10 py-5 border-2 border-primary font-semibold">
                Start Shipping <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="px-10 py-5 font-semibold text-md text-white bg-transparent border-2"
              >
                Get Quote
              </Button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center mb-8">
                Quick Quote
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    From
                  </label>
                  <input
                    type="text"
                    placeholder="Origin city"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    placeholder="Destination city"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="0.5"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>Express</option>
                    <option>Standard</option>
                    <option>Economy</option>
                  </select>
                </div>
              </div>

              <Button className="py-6 border-2 border-primary font-semibold w-full text-lg">
                Start Shipping <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
