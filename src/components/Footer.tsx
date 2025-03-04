import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
      <footer className="dark:bg-navy-800/50 bg-gray-100 py-16 px-6 text-gray-800 dark:text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Athlon</h3>
              <p className="dark:text-navy-200 text-gray-600 mb-4">
                Making sports facility booking seamless and accessible for everyone.
              </p>
              <div className="flex gap-4">
                <a
                    href="https://www.instagram.com/athlon.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-navy-200 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-navy-200 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="dark:text-navy-200 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors">About Athlon</a>
                </li>
                <li>
                  <a href="#features" className="dark:text-navy-200 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
                </li>
                <li>
                  <a href="#pricing" className="dark:text-navy-200 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors">How it works</a>
                </li>
                <li>
                  <a href="#team" className="dark:text-navy-200 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors">Our Team</a>
                </li>
                <li>
                  <a href="#pricing" className="dark:text-navy-200 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 dark:text-navy-200 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  123 Sports Avenue, SL 10001
                </li>
                <li className="flex items-center gap-2 dark:text-navy-200 text-gray-600">
                  <Phone className="w-5 h-5" />
                  +94 772222222
                </li>
                <li className="flex items-center gap-2 dark:text-navy-200 text-gray-600">
                  <Mail className="w-5 h-5" />
                  contact@athlon.com
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Updates</h4>
              <p className="dark:text-navy-200 text-gray-600 mb-4">
                Stay tuned for updates and special offers.
              </p>
              <form className="space-y-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg dark:bg-navy-700/50 bg-white border dark:border-navy-600 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition-colors text-white"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t dark:border-navy-700 border-gray-300">
            <div className="text-center dark:text-navy-200 text-gray-600">
              <p>© 2024 athlon. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};