import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import HandicraftsPage from './HandicraftsPage';
import HomestaysPage from './HomestaysPage';
import EventsPage from './EventsPage';
import LocalGuidesPage from './LocalGuidesPage';

const MarketplaceLanding: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const marketplaceSections = [
    {
      id: 'handicrafts',
      title: 'Handicrafts',
      icon: <FaIcons.FaPalette className="text-6xl mb-4 text-white" />,
      description: 'Discover authentic Jharkhand tribal & local products including jewelry, handwoven textiles, bamboo crafts, and traditional artwork.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'homestays',
      title: 'Homestays',
      icon: <FaIcons.FaHome className="text-6xl mb-4 text-white" />,
      description: 'Stay with local families and experience authentic Jharkhand hospitality. Verified homestays with modern amenities and cultural immersion.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gradient: 'from-green-600 to-teal-600'
    },
    {
      id: 'events',
      title: 'Events',
      icon: <FaIcons.FaCalendarAlt className="text-6xl mb-4 text-white" />,
      description: 'Join cultural festivals, tribal celebrations, eco-tourism activities, and seasonal events happening across Jharkhand.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gradient: 'from-orange-600 to-red-600'
    },
    {
      id: 'guides',
      title: 'Hire a Local Guide',
      icon: <FaIcons.FaUserTie className="text-6xl mb-4 text-white" />,
      description: 'Connect with verified local guides who know the hidden gems, cultural stories, and best experiences Jharkhand has to offer.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gradient: 'from-blue-600 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container-custom relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Jharkhand Marketplace
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your gateway to authentic local experiences, products, and services
          </motion.p>
        </div>
      </section>

      {/* Marketplace Sections */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Explore Our Marketplace</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the best of Jharkhand through our curated marketplace featuring local artisans, 
              homestay hosts, cultural events, and experienced guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketplaceSections.map((section, index) => (
              <motion.div
                key={section.id}
                className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <Link to={`/marketplace/${section.id}`} className="block h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-80`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-80 flex flex-col justify-center items-center text-center text-white">
                  {section.icon}
                  <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                  <p className="text-lg opacity-90 leading-relaxed">{section.description}</p>
                  
                  {/* Call to Action */}
                  <div className="mt-6">
                    <span className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-opacity-30 transition-all duration-300">
                      Explore {section.title}
                      <FaIcons.FaArrowRight className="ml-2" />
                    </span>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Why Choose Our Marketplace?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaIcons.FaShieldAlt className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Sellers</h3>
              <p className="text-gray-600">All our sellers and service providers are verified through thorough background checks and authentication for your safety and trust.</p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaIcons.FaHeart className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Authentic Experiences</h3>
              <p className="text-gray-600">Connect directly with local communities and experience the true culture and traditions of Jharkhand.</p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaIcons.FaCreditCard className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Safe and secure payment processing through trusted payment gateways with buyer protection.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your journey through Jharkhand's vibrant marketplace and discover authentic local experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/explore" className="bg-white text-primary font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
              Explore Destinations
            </Link>
            <Link to="/explore" className="border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-primary transition-colors">
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const MarketplacePage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<MarketplaceLanding />} />
      <Route path="handicrafts" element={<HandicraftsPage />} />
      <Route path="homestays" element={<HomestaysPage />} />
      <Route path="events" element={<EventsPage />} />
      <Route path="guides" element={<LocalGuidesPage />} />
    </Routes>
  );
};

export default MarketplacePage;