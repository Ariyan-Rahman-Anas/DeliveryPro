import { Clock, Globe, Package, Star, Users } from 'lucide-react';

const Stats = () => {
  const statsData = [
    {
      number: '2M+',
      label: 'Happy Customers',
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: '50K+',
      label: 'Daily Deliveries',
      icon: <Package className="w-8 h-8" />,
    },
    {
      number: '99.9%',
      label: 'On-Time Rate',
      icon: <Clock className="w-8 h-8" />,
    },
    {
      number: '50+',
      label: 'Countries Served',
      icon: <Globe className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/25 text-primary px-4 py-2 rounded-full font-semibold mb-4">
            <Star className="w-5 h-5" />
            <span>Our Impact</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our commitment to excellence has made us the preferred choice for
            businesses and individuals globally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:bg-gray-800 hover:border-primary/50 transition-all duration-300 group">
                <div className="text-primary flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2 text-primary">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Stats;
