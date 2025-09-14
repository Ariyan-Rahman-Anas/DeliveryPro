import { Building, Clock, Globe, Leaf, MapPin, Zap } from 'lucide-react';

const CompanyStory = () => {
  const milestones = [
    {
      year: '2010',
      title: 'Company Founded',
      description:
        'Started as a small local delivery service with just 3 vehicles and a big dream.',
      icon: <Building className="w-6 h-6" />,
    },
    {
      year: '2015',
      title: 'National Expansion',
      description:
        'Expanded operations nationwide with 100+ delivery hubs across the country.',
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      year: '2018',
      title: 'Technology Innovation',
      description:
        'Launched our revolutionary tracking system and mobile app platform.',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      year: '2020',
      title: 'International Growth',
      description:
        'Began international operations, now serving 50+ countries worldwide.',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      year: '2024',
      title: 'Sustainable Future',
      description:
        'Committed to carbon-neutral delivery with our green logistics initiative.',
      icon: <Leaf className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-4">
            <Clock className="w-5 h-5" />
            <span>Our Journey</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Our Story of Growth & Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to global leadership, discover how we've
            evolved to become the world's most trusted delivery partner.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden lg:block"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div
                  className={`lg:w-1/2 ${
                    index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  }`}
                >
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-green-200 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-100 p-2 rounded-lg text-green-600">
                        {milestone.icon}
                      </div>
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:block relative z-10">
                  <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                <div className="lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default CompanyStory;
