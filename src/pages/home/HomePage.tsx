import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover India
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Culture, Nature & Adventure
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/explore" className="btn-primary text-lg px-8 py-3">
              Explore Now
            </Link>
            <Link to="/itinerary" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3">
              Plan Your Trip
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <a href="#highlights" className="text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Highlights Carousel */}
      <section id="highlights" className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Highlights of India</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Highlight 1 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Taj Mahal" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Taj Mahal</h3>
                <p className="text-gray-600 mb-4">Experience the iconic symbol of love and one of the Seven Wonders of the World in Agra.</p>
                <Link to="/explore" className="text-primary font-medium hover:underline">Discover More</Link>
              </div>
            </motion.div>
            
            {/* Highlight 2 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
                  alt="Kerala Backwaters" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Kerala Backwaters</h3>
                <p className="text-gray-600 mb-4">Explore the serene backwaters and lush landscapes of God's Own Country.</p>
                <Link to="/explore" className="text-primary font-medium hover:underline">Discover More</Link>
              </div>
            </motion.div>
            
            {/* Highlight 3 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Rajasthan Culture" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Rajasthan Culture</h3>
                <p className="text-gray-600 mb-4">Immerse yourself in the royal heritage and vibrant culture of the Land of Kings.</p>
                <Link to="/cultural" className="text-primary font-medium hover:underline">Discover More</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Access Tiles */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Plan Your Perfect Trip</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tile 1 */}
            <Link to="/itinerary">
              <motion.div 
                className="bg-primary text-white rounded-lg p-8 text-center h-full flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <FaIcons.FaMapMarkedAlt className="text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Itinerary Planner</h3>
                <p>Create your custom travel plan with our AI-powered assistant</p>
              </motion.div>
            </Link>
            

            {/* Tile 2 */}
            <Link to="/community">
              <motion.div 
                className="bg-tertiary text-white rounded-lg p-8 text-center h-full flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <FaIcons.FaUserFriends className="text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Book Local Guides</h3>
                <p>Connect with experienced local guides for authentic experiences</p>
              </motion.div>
            </Link>
            
            {/* Tile 3 */}
            <Link to="/explore">
              <motion.div 
                className="bg-gray-800 text-white rounded-lg p-8 text-center h-full flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <FaIcons.FaVrCardboard className="text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Explore in VR</h3>
                <p>Preview destinations with immersive 360° virtual tours</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-center mb-12">What Travelers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold">Priya Sharma</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The tribal village tour was an eye-opening experience. Our local guide was knowledgeable and the cultural immersion was authentic. Highly recommend!"</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold">Rajesh Kumar</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The itinerary planner made our trip so much easier! We discovered hidden gems we would have missed otherwise. The diversity of India is truly spectacular."</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold">Amit Patel</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The VR preview helped us decide which places to visit. The national parks were amazing - we saw tigers, elephants and a variety of birds. Great wildlife experience!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Explore India?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Start planning your adventure today and discover the incredible diversity of this beautiful country.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/explore" className="bg-white text-primary font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
              Browse Destinations
            </Link>
            <Link to="/itinerary" className="border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-primary transition-colors">
              Create Itinerary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;