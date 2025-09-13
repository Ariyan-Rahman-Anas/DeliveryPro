import {
  Award,
  Globe,
  Leaf,
  Package,
  ShieldCheck,
  Star,
  TrendingUp,
} from 'lucide-react';

const OurAwards = () => {
  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Best Logistics Company 2024',
      organization: 'International Shipping Awards',
      year: '2024',
      description:
        'Recognized for excellence in global logistics and customer satisfaction.',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Customer Choice Award',
      organization: 'Consumer Trust Association',
      year: '2023',
      description:
        'Voted #1 delivery service by customers for reliability and service quality.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Technology Innovation Leader',
      organization: 'Tech Excellence Council',
      year: '2023',
      description:
        'Leading the industry in AI-powered logistics and tracking technology.',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Green Business Certification',
      organization: 'Environmental Council',
      year: '2022',
      description:
        'Certified for our commitment to sustainable delivery practices and carbon neutrality.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Expansion Excellence',
      organization: 'International Business Forum',
      year: '2022',
      description:
        'Recognized for successful expansion into 50+ countries while maintaining quality.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Security & Safety Award',
      organization: 'Logistics Security Council',
      year: '2021',
      description:
        'Outstanding commitment to package security and safe handling practices.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-4">
            <Award className="w-5 h-5" />
            <span>Recognition</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Awards & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence has been recognized by industry leaders
            and customers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-200 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-green-100 p-3 rounded-xl text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                  {achievement.icon}
                </div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {achievement.year}
                </div>
              </div>

              <h3 className="text-xl font-bold text-black mb-2">
                {achievement.title}
              </h3>
              <p className="text-green-600 font-semibold mb-3">
                {achievement.organization}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-black rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience Excellence?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of satisfied customers who trust DeliveryPro for
              their shipping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2">
                Start Shipping <Package className="w-5 h-5" />
              </button>
              <button className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OurAwards;
