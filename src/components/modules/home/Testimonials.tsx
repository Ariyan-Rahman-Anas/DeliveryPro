import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      content:
        'The tracking system is incredible! I can see exactly where my packages are at all times. Customer service is responsive and helpful.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    {
      name: 'Michael Chen',
      role: 'E-commerce Manager',
      content:
        'We ship hundreds of packages monthly and the reliability is outstanding. Never had issues with damaged or lost items.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Freelance Designer',
      content:
        'International shipping made easy! My clients receive their packages quickly and safely. Highly recommend for global deliveries.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/12 text-primary px-4 py-2 rounded-full font-semibold mb-4">
            <Star className="w-5 h-5" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. See what thousands of satisfied
            customers have to say about our service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-muted-foreground/20 hover:border-primary/70 group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-current" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/70"
                />
                <div>
                  <div className="font-bold text-black">{testimonial.name}</div>
                  <div className="text-muted-foreground/80 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
