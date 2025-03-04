import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export const BookingCalendar = () => {
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
  
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="w-6 h-6 text-navy-200" />
        <h3 className="text-xl font-semibold">Available Time Slots</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {timeSlots.map((time) => (
          <motion.button
            key={time}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-navy-700/50 p-3 rounded-lg hover:bg-navy-600/50 transition-colors"
          >
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};