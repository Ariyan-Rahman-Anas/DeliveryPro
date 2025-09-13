import {
  Award,
  CheckCircle,
  Heart,
  Leaf,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const Values = () => {
  const values = [
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: 'Trust & Security',
      description:
        'Every package is handled with the highest level of security and care, ensuring complete peace of mind for our customers.',
      features: [
        'End-to-end encryption',
        'Insurance coverage',
        'Secure facilities',
      ],
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Speed & Efficiency',
      description:
        'Leveraging cutting-edge technology and optimized logistics to deliver packages faster than ever before.',
      features: [
        'Real-time optimization',
        'Advanced routing',
        'Quick processing',
      ],
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Customer Care',
      description:
        'Our dedicated support team is available 24/7 to ensure every customer receives exceptional service.',
      features: [
        '24/7 support',
        'Personal assistance',
        'Satisfaction guarantee',
      ],
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: 'Sustainability',
      description:
        'Committed to reducing our environmental impact through green initiatives and sustainable practices.',
      features: ['Carbon neutral', 'Eco-friendly packaging', 'Green vehicles'],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-4">
            <Award className="w-5 h-5" />
            <span>Our Values</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            What Drives Us Forward
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our core values shape everything we do, from how we handle your
            packages to how we serve our communities worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-200 group"
            >
              <div className="text-green-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {value.description}
              </p>
              <ul className="space-y-2">
                {value.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
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
export default Values;
