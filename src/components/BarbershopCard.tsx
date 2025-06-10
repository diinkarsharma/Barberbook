import React from 'react';
import { Star, Clock, MapPin, Users } from 'lucide-react';

interface Barbershop {
  id: string;
  name: string;
  location: string;
  image_url: string | null;
  rating: number;
  wait_time: string;
  barbers: Array<{
    id: string;
    name: string;
    image_url: string | null;
    speciality: string | null;
    available: boolean;
    rating: number;
  }>;
  services: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
  }>;
}

interface BarbershopCardProps {
  barbershop: Barbershop;
  onBook: (barbershopId: string) => void;
}

const BarbershopCard: React.FC<BarbershopCardProps> = ({ barbershop, onBook }) => {
  return (
    <div className="card p-6 hover:scale-[1.02] transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={barbershop.image_url || 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=200'}
          alt={barbershop.name}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{barbershop.name}</h3>
          <div className="flex items-center gap-1 text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{barbershop.location}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gold-500 fill-current" />
              <span className="font-medium text-gray-900">{barbershop.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-orange-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{barbershop.wait_time} wait</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Popular Services</h4>
        <div className="grid grid-cols-2 gap-2">
          {barbershop.services.slice(0, 4).map((service) => (
            <div key={service.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{service.name}</span>
              <span className="font-medium text-gray-900">₹{service.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Barbers */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">Available Barbers</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {barbershop.barbers.map((barber) => (
            <div
              key={barber.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                barber.available
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-gray-50 text-gray-500 border border-gray-200'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  barber.available ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></div>
              <span>{barber.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={() => onBook(barbershop.id)}
        className="w-full btn-primary"
      >
        Book Now
      </button>
    </div>
  );
};

export default BarbershopCard;