import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Journey 360</h3>
            <p className="text-gray-300 mb-4">
              Discover the beauty, culture, and adventure that India has to offer.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaIcons.FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaIcons.FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaIcons.FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaIcons.FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-white">Explore</Link>
              </li>
              <li>
                <Link to="/itinerary" className="text-gray-300 hover:text-white">Itinerary Planner</Link>
              </li>

              <li>
                <Link to="/community" className="text-gray-300 hover:text-white">Community</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-300 hover:text-white">Safety Tips</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>Ministry of Tourism</p>
              <p>Government of India</p>
              <p>Transport Bhawan, Parliament Street</p>
              <p>New Delhi, India 110001</p>
              <p className="mt-2">Email: info@incredibleindia.org</p>
              <p>Phone: +91 11 2371 4000</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Journey 360. All rights reserved.</p>
        </div>
      </div>
      
      {/* Emergency Help Button */}
      <div className="fixed bottom-4 left-4 z-40">
        <Link 
          to="/safety"
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors"
        >
          <span className="mr-2">🆘</span> Emergency Help
        </Link>
      </div>
    </footer>
  );
};

export default Footer;