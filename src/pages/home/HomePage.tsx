import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1619500765355-8ba767d6e261?q=80&w=1297&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Jharkhand
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
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link to="/explore">Explore Now</Link>
            </Button>
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
          <h2 className="text-3xl font-display font-bold text-center mb-12">Highlights of Jharkhand</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Highlight 1 - Hundru Falls */}
            <motion.div 
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1558451701-4662b9367fc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Hundru Falls" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">Hundru Falls</CardTitle>
                  <CardDescription className="mb-4">One of the highest waterfalls in Jharkhand, offering spectacular views and natural beauty perfect for photography and trekking.</CardDescription>
                  <Button variant="link" asChild className="p-0 h-auto text-primary font-medium">
                    <Link to="/explore">Discover More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Highlight 2 - Betla National Park */}
            <motion.div 
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://www.hindfirst.in/sortd-service/imaginary/v22-01/webp/medium/high?url=b3R0aW5kaWEtYXBwLXByb2Qtc29ydGQvbWVkaWE4M2FiNmFkMC04MDAwLTExZjAtODQ5Yi1kMTFjM2YzYjI1ZTcucG5n" 
                    alt="Betla National Park" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">Betla National Park</CardTitle>
                  <CardDescription className="mb-4">Experience wildlife safaris and discover diverse flora and fauna in one of Jharkhand's premier national parks.</CardDescription>
                  <Button variant="link" asChild className="p-0 h-auto text-primary font-medium">
                    <Link to="/explore">Discover More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Highlight 3 - Jagannath Temple Ranchi */}
            <motion.div 
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://xplro.com/wp-content/uploads/2024/06/Untitled-design-73.jpg.webp" 
                    alt="Jagannath Temple Ranchi" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">Jagannath Temple Ranchi</CardTitle>
                  <CardDescription className="mb-4">A replica of the famous Puri Jagannath Temple, significant for Hindu pilgrims and showcasing beautiful architecture.</CardDescription>
                  <Button variant="link" asChild className="p-0 h-auto text-primary font-medium">
                    <Link to="/explore">Discover More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Access Tiles */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Plan Your Perfect Trip</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Tile 1 - Marketplace */}
            <Link to="/marketplace">
              <motion.div 
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Card className="bg-primary text-white h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                    <FaIcons.FaShoppingCart className="text-4xl mb-4" />
                    <CardTitle className="text-xl mb-2 text-white">Marketplace</CardTitle>
                    <CardDescription className="text-white/90">Book accommodations, tours, and local experiences</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            {/* Tile 2 - VR Explore */}
            <Link to="/explore">
              <motion.div 
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Card className="bg-gray-800 text-white h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                    <FaIcons.FaVrCardboard className="text-4xl mb-4" />
                    <CardTitle className="text-xl mb-2 text-white">Explore in VR</CardTitle>
                    <CardDescription className="text-white/90">Preview destinations with immersive 360° virtual tours</CardDescription>
                  </CardContent>
                </Card>
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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <CardTitle className="text-base font-bold">Priya Sharma</CardTitle>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className="italic">"The tribal village tour was an eye-opening experience. Our local guide was knowledgeable and the cultural immersion was authentic. Highly recommend!"</CardDescription>
              </CardContent>
            </Card>
            
            {/* Testimonial 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <CardTitle className="text-base font-bold">Rajesh Kumar</CardTitle>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <CardDescription className="italic">"Journey 360 helped us discover amazing destinations and connect with local guides. The virtual tours were incredibly helpful for planning our trip!"</CardDescription>
              </CardContent>
            </Card>
            
            {/* Testimonial 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <CardTitle className="text-base font-bold">Amit Patel</CardTitle>
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
                <CardDescription className="italic">"The VR preview helped us decide which places to visit. The national parks were amazing - we saw tigers, elephants and a variety of birds. Great wildlife experience!"</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Explore Jharkhand?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Start planning your adventure today and discover the incredible diversity of this beautiful country.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" size="lg" className="font-bold py-3 px-8">
              <Link to="/explore">Browse Destinations</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;