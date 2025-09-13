import { staticAssets } from '@/assets';
import { Globe, Users } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Ariyan Rahman Anas',
      role: 'Chief Executive Officer',
      image: staticAssets.images.CEO,
      bio: "15+ years in logistics and supply chain management. Led the company's expansion into international markets.",
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Former Google engineer who revolutionized our tracking technology and developed our AI-powered logistics system.',
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Michael Johnson',
      role: 'Head of Operations',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Operations expert with 20+ years experience ensuring seamless delivery operations across all regions.',
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Experience Director',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Passionate about customer satisfaction, leading our 24/7 support team and continuous service improvement.',
      social: { linkedin: '#', twitter: '#' },
    },
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold mb-4">
            <Users className="w-5 h-5" />
            <span>Our Team</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Meet the Visionaries Behind DeliveryPro
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our leadership team combines decades of experience in logistics,
            technology, and customer service to drive innovation in the delivery
            industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 group"
            >
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-green-500/20 group-hover:border-green-500 transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors duration-300"></div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-green-400 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                <div className="flex justify-center gap-3">
                  <a
                    href={member.social.linkedin}
                    className="bg-gray-800 p-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
                  >
                    <Users className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="bg-gray-800 p-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Team;
