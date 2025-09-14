import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Clock,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-black text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Package className="w-5 h-5" />
                <span>Fast & Reliable Delivery</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Swift & Secure
                <span className="block text-primary">Delivery</span>
              </h1>
              <p className="text-lg text-muted/85 leading-relaxed">
                Experience lightning-fast parcel delivery with real-time
                tracking, guaranteed security, and 99.9% on-time delivery rate
                across the globe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="px-10 py-5 font-semibold text-md border-2 border-primary">
                Ship Now <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="px-10 py-5 font-semibold text-md text-white bg-transparent border-2"
              >
                Ship Now <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150K+</div>
                <div className="text-gray-400">Deliveries/Month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-gray-400">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-gray-400">On-Time Rate</div>
              </div>
            </div>
          </div>

          <div className="relative border4 flex justify-center md:justify-end">
            <div className="absolute inset-0 bg-primary rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-primary" />
                  <span className="text-lg font-semibold">
                    Express Delivery
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-primary" />
                  <span className="text-lg font-semibold">
                    Real-time Tracking
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  <span className="text-lg font-semibold">
                    Secure & Insured
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-primary" />
                  <span className="text-lg font-semibold">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
