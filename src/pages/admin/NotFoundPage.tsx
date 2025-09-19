import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

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
            Page Not Found
          </h2>
          <p className="mt-2 text-center text-lg text-gray-400">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <div className="mt-8">
          <Link 
            to="/"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaHome className="mr-2" /> Go to Main Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;