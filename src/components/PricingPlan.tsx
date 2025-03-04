import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingPlanProps {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export const PricingPlan = ({ name, price, features, recommended }: PricingPlanProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 relative ${
        recommended ? 'border-2 border-blue-500' : ''
      }`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 px-4 py-1 rounded-full text-sm font-semibold">
          Recommended
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-navy-200">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-navy-200">
            <Check className="w-5 h-5 text-blue-500" />
            {feature}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-lg font-semibold ${
          recommended
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-navy-700 hover:bg-navy-600'
        } transition-colors`}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};