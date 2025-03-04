import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const Navigation = ({ darkMode, setDarkMode }: NavigationProps) => {
  return (
    <nav className="fixed w-full backdrop-blur-lg bg-navy-900/50 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            athlon
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-navy-200 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-navy-200 hover:text-white transition-colors">About Us</a>
            <a href="#team" className="text-navy-200 hover:text-white transition-colors">Team</a>
            <a href="#pricing" className="text-navy-200 hover:text-white transition-colors">Pricing</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-navy-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};