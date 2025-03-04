import { motion } from 'framer-motion';
import { Users, DollarSign, Calculator } from 'lucide-react';
import { useState } from 'react';

export const GroupBooking = () => {
  const [participants, setParticipants] = useState(4);
  const hourlyRate = 50;
  const costPerPerson = hourlyRate / participants;
  
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-navy-200" />
        <h3 className="text-xl font-semibold">Group Booking Calculator</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-navy-200 mb-2">Number of Participants</label>
          <input
            type="range"
            min="2"
            max="10"
            value={participants}
            onChange={(e) => setParticipants(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-navy-200 mt-1">
            <span>2</span>
            <span>Current: {participants}</span>
            <span>10</span>
          </div>
        </div>
        <div className="bg-navy-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-navy-200">Hourly Rate</span>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{hourlyRate}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-navy-200">Cost per Person</span>
            <motion.div
              key={costPerPerson}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 font-semibold"
            >
              <Calculator className="w-4 h-4" />
              <span>${costPerPerson.toFixed(2)}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};