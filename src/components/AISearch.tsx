import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

export const AISearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg rounded-full px-6 py-4">
        <Search className="w-5 h-5 text-navy-200" />
        <input
          type="text"
          placeholder="Find available basketball courts on Sunday..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-white placeholder-navy-200"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-navy-200 hover:text-white transition-colors"
        >
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/5 backdrop-blur-lg rounded-xl p-4"
        >
          <div className="text-sm text-navy-200">
            AI Suggestions:
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Available basketball courts this Sunday between 2-6 PM
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Popular time slots for basketball on weekends
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};