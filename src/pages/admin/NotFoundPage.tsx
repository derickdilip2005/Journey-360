import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaShieldAlt, FaSearch, FaUsersCog, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full space-y-8 text-center bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700"
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
            className="mx-auto flex justify-center"
          >
            <FaExclamationTriangle className="text-9xl text-yellow-500" />
          </motion.div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Page Not Found
          </h2>
          <p className="mt-2 text-center text-lg text-gray-400">
            The administrative page you're looking for doesn't exist or you don't have sufficient permissions.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link 
            to="/admin"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaShieldAlt className="mr-2" /> Return to Admin Dashboard
          </Link>
          
          <Link 
            to="/"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FaHome className="mr-2" /> Go to Main Website
          </Link>
        </div>
        
        <div className="mt-6 border-t border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-white">Looking for a specific admin section?</h3>
          <div className="mt-4 flex rounded-md shadow-sm">
            <div className="relative flex items-stretch flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="focus:ring-primary focus:border-primary block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-600 bg-gray-700 text-white"
                placeholder="Search admin sections..."
              />
            </div>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-600 text-sm font-medium rounded-r-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-base text-gray-400">
            Need assistance? <Link to="/admin/contact" className="font-medium text-primary hover:text-primary-light">Contact the admin team</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;