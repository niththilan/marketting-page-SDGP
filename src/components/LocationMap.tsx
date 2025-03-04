import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const locations = [
  { id: 1, name: 'Downtown Sports Center', address: '123 Main St', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80' },
  { id: 2, name: 'Riverside Arena', address: '456 River Rd', image: 'https://images.unsplash.com/photo-1562552052-c72ceddf93dc?auto=format&fit=crop&q=80' },
  { id: 3, name: 'Central Court Complex', address: '789 Park Ave', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80' },
];

export const LocationMap = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <motion.div
          key={location.id}
          whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
        >
          <div className="h-48 relative">
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{location.name}</h3>
            <div className="flex items-center gap-2 text-navy-200">
              <MapPin className="w-4 h-4" />
              <span>{location.address}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};