import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full space-y-8 text-center"
      >
        <div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
            className="mx-auto"
          >
            <h1 className="text-9xl font-bold text-primary">404</h1>
          </motion.div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link 
            to="/"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaIcons.FaHome className="mr-2" /> Return to Homepage
          </Link>
          
          <Link 
            to="/explore"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaIcons.FaMapMarkedAlt className="mr-2" /> Explore Jharkhand
          </Link>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900">Looking for something specific?</h3>
          <div className="mt-4 flex rounded-md shadow-sm">
            <div className="relative flex items-stretch flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIcons.FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="focus:ring-primary focus:border-primary block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                placeholder="Search for destinations, experiences..."
              />
            </div>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-base text-gray-500">
            Need assistance? <a href="#" className="font-medium text-primary hover:text-primary-dark">Contact our support team</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;