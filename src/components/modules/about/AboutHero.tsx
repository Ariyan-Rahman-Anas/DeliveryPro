import { Building, Globe, Heart, Target } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold">
                <Building className="w-5 h-5" />
                <span>About DeliveryPro</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Connecting the World
                <span className="block text-green-400">
                  One Package at a Time
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Since 2010, we've been revolutionizing the delivery industry
                with cutting-edge technology, unmatched reliability, and a
                commitment to excellence that spans across 50+ countries
                worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  14+
                </div>
                <div className="text-gray-300">Years of Excellence</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  2M+
                </div>
                <div className="text-gray-300">Happy Customers</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  50+
                </div>
                <div className="text-gray-300">Countries Served</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Our Mission
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 rounded-full p-2 flex-shrink-0 mt-1">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Reliable Delivery
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Ensuring every package reaches its destination safely
                        and on time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 rounded-full p-2 flex-shrink-0 mt-1">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Customer First
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Putting our customers at the heart of everything we do.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 rounded-full p-2 flex-shrink-0 mt-1">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        Global Reach
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Connecting businesses and people across continents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutHero;
