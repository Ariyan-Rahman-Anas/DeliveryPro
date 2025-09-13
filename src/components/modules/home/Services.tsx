import { CheckCircle, Globe, Package, ShieldCheck, Truck } from 'lucide-react';

const Services = () => {
  const servicesData = [
    {
      icon: <Truck className="w-12 h-12" />,
      title: 'Express Delivery',
      description:
        'Same-day and next-day delivery options for urgent shipments with priority handling.',
      features: ['Same-day delivery', 'Priority handling', 'SMS notifications'],
    },
    {
      icon: <Package className="w-12 h-12" />,
      title: 'Standard Shipping',
      description:
        'Cost-effective solution for regular deliveries with reliable tracking and insurance.',
      features: ['3-5 business days', 'Package insurance', 'Tracking included'],
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'International',
      description:
        'Global shipping solutions with customs clearance and international tracking.',
      features: ['50+ countries', 'Customs handling', 'Global tracking'],
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: 'Secure Transit',
      description:
        'High-value item delivery with enhanced security measures and signature confirmation.',
      features: ['Enhanced security', 'Signature required', 'Full insurance'],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/12 text-primary px-4 py-2 rounded-full font-semibold mb-4">
            <Package className="w-5 h-5" />
            <span>Our Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Delivery Solutions for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From express same-day delivery to international shipping, we provide
            comprehensive logistics solutions tailored to your requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-muted-foreground/20 hover:border-primary/70 group"
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
