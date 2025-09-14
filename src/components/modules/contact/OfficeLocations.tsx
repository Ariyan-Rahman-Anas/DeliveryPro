import SectionContainer from '@/components/common/SectionContainer';
import { Building, Clock, MapPin, Phone } from 'lucide-react';

const OfficeLocations = () => {
  const offices = [
    {
      city: 'New York',
      address: '123 Business Ave, Suite 500',
      zipcode: 'New York, NY 10001',
      phone: '+1 (212) 555-0123',
      hours: 'Mon-Fri: 8AM-8PM EST',
    },
    {
      city: 'Los Angeles',
      address: '456 Commerce Blvd, Floor 12',
      zipcode: 'Los Angeles, CA 90210',
      phone: '+1 (310) 555-0456',
      hours: 'Mon-Fri: 8AM-8PM PST',
    },
    {
      city: 'Chicago',
      address: '789 Delivery Street, Suite 300',
      zipcode: 'Chicago, IL 60601',
      phone: '+1 (312) 555-0789',
      hours: 'Mon-Fri: 8AM-8PM CST',
    },
    {
      city: 'Miami',
      address: '321 Shipping Lane, Building A',
      zipcode: 'Miami, FL 33101',
      phone: '+1 (305) 555-0321',
      hours: 'Mon-Fri: 8AM-8PM EST',
    },
  ];

  return (
    <SectionContainer className="">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold mb-4">
          <MapPin className="w-5 h-5" />
          <span>Our Branches</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Our Office Locations
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Visit us at any of our nationwide locations for in-person support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {offices.map((office, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl border border-muted-foreground/25 hover:border-primary transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <Building className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">{office.city}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>{office.address}</p>
                  <p>{office.zipcode}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-gray-400 text-sm">{office.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <p className="text-gray-400 text-sm">{office.hours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
export default OfficeLocations;
