import { Clock, MapPin, ShieldCheck } from 'lucide-react';

const Features = () => {
  const featuresData = [
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: 'Real-Time Tracking',
      description:
        'Monitor your package every step of the way with live GPS tracking and instant status updates.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: 'Real-Time Tracking',
      description:
        'Monitor your package every step of the way with live GPS tracking and instant status updates.',
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: 'Real-Time Tracking',
      description:
        'Monitor your package every step of the way with live GPS tracking and instant status updates.',
    },
  ];

  return (
    <section className="py-20 bg-muted-foreground/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/12 text-primary px-4 py-2 rounded-full font-semibold">
                <ShieldCheck className="w-5 h-5" />
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-black">
                Advanced Features for Perfect Delivery
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Advanced technology meets exceptional service to deliver an
                unparalleled shipping experience.
              </p>
            </div>

            <div className="space-y-4">
              {featuresData.map(({ icon, title, description }, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 bg-white p-6 rounded-2xl border border-muted-foreground/20 hover:border-primary/70 transition-all duration-300"
                >
                  <div className="bg-primary/12 rounded-xl p-3 flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      {title}
                    </h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-black rounded-3xl p-8 text-white">
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">
                      Package #DL2024001
                    </span>
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold">
                      In Transit
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm">
                        Package picked up - New York
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm">
                        Departed facility - Newark
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm">In transit - Chicago Hub</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">
                        Out for delivery - Los Angeles
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">
                    Estimated Delivery
                  </div>
                  <div className="text-primary font-semibold">
                    Tomorrow, 2:30 PM
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
export default Features;
