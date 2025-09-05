import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

// Types
interface TouristSpot {
  id: number;
  name: string;
  category: 'nature' | 'heritage' | 'adventure' | 'spiritual' | 'festival';
  location: string;
  description: string;
  image: string;
  hasVR: boolean;
  timings: string;
  bestTime: string;
}

// Sample data
const touristSpots: TouristSpot[] = [
  {
    id: 1,
    name: 'Hundru Falls',
    category: 'nature',
    location: 'Ranchi',
    description: 'One of the highest waterfalls in Jharkhand, Hundru Falls is formed by the Subarnarekha River, falling from a height of 98 meters.',
    image: 'https://images.unsplash.com/photo-1623058324456-686d39200145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasVR: true,
    timings: '6:00 AM - 5:00 PM',
    bestTime: 'July to October',
  },
  {
    id: 2,
    name: 'Betla National Park',
    category: 'nature',
    location: 'Latehar',
    description: 'One of the first tiger reserves of India, Betla National Park is home to a variety of flora and fauna including tigers, elephants, and various species of deer.',
    image: 'https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasVR: true,
    timings: '9:00 AM - 5:00 PM',
    bestTime: 'November to June',
  },
  {
    id: 3,
    name: 'Jagannath Temple',
    category: 'spiritual',
    location: 'Ranchi',
    description: 'A replica of the famous Jagannath Temple in Puri, this temple is an important religious site for Hindus in Jharkhand.',
    image: 'https://images.unsplash.com/photo-1609146708744-01a0746530b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasVR: false,
    timings: '5:00 AM - 9:00 PM',
    bestTime: 'Year-round',
  },
  {
    id: 4,
    name: 'Netarhat',
    category: 'nature',
    location: 'Latehar',
    description: 'Known as the "Queen of Chotanagpur", Netarhat is a hill station famous for its stunning sunrise and sunset views.',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasVR: true,
    timings: 'Open 24 hours',
    bestTime: 'October to June',
  },
  {
    id: 5,
    name: 'Parasnath Hill',
    category: 'spiritual',
    location: 'Giridih',
    description: 'The highest mountain in Jharkhand and a sacred place for Jains, with 24 Jain temples located on the hill.',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasVR: false,
    timings: 'Open 24 hours',
    bestTime: 'October to March',
  },
  {
    id: 6,
    name: 'Jonha Falls',
    category: 'nature',
    location: 'Ranchi',
    description: 'Also known as Gautam Dhara, this waterfall is surrounded by dense forest and offers a scenic view.',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasVR: true,
    timings: '7:00 AM - 5:00 PM',
    bestTime: 'July to October',
  },
  {
    id: 7,
    name: 'Sarhul Festival',
    category: 'festival',
    location: 'Across Jharkhand',
    description: 'A major tribal festival celebrating the beginning of spring and the flowering of the Sal tree.',
    image: 'https://images.unsplash.com/photo-1624628639856-100bf817a8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    hasVR: false,
    timings: 'Festival dates vary',
    bestTime: 'March-April',
  },
  {
    id: 8,
    name: 'Patratu Valley',
    category: 'adventure',
    location: 'Ramgarh',
    description: 'A scenic valley offering activities like boating, trekking, and camping with beautiful views of the reservoir.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasVR: true,
    timings: '8:00 AM - 6:00 PM',
    bestTime: 'October to March',
  },
];

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  // Filter spots based on category and search query
  const filteredSpots = touristSpots.filter((spot) => {
    const matchesCategory = selectedCategory === 'all' || spot.category === selectedCategory;
    const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Explore Jharkhand</h1>
          <p className="text-xl max-w-3xl">Discover the natural beauty, rich heritage, and cultural wonders of Jharkhand</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-8 relative z-20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search destinations, locations..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-md ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('nature')}
                className={`px-4 py-2 rounded-md ${selectedCategory === 'nature' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Nature
              </button>
              <button
                onClick={() => setSelectedCategory('heritage')}
                className={`px-4 py-2 rounded-md ${selectedCategory === 'heritage' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Heritage
              </button>
              <button
                onClick={() => setSelectedCategory('adventure')}
                className={`px-4 py-2 rounded-md ${selectedCategory === 'adventure' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Adventure
              </button>
              <button
                onClick={() => setSelectedCategory('spiritual')}
                className={`px-4 py-2 rounded-md ${selectedCategory === 'spiritual' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Spiritual
              </button>
              <button
                onClick={() => setSelectedCategory('festival')}
                className={`px-4 py-2 rounded-md ${selectedCategory === 'festival' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Festivals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tourist Spots Grid */}
      <section className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpots.map((spot) => (
            <motion.div 
              key={spot.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => setSelectedSpot(spot)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={spot.image} 
                  alt={spot.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                  {spot.category.charAt(0).toUpperCase() + spot.category.slice(1)}
                </div>
                {spot.hasVR && (
                  <div className="absolute bottom-0 left-0 bg-secondary text-white px-3 py-1 m-2 rounded-full text-sm font-medium flex items-center">
                    <FaIcons.FaVrCardboard className="mr-1" /> VR Available
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{spot.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaIcons.FaMapMarkerAlt className="mr-2" />
                  <span>{spot.location}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{spot.description}</p>
                <button className="text-primary font-medium hover:underline">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSpots.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No destinations found matching your criteria</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </section>

      {/* Detailed Spot Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedSpot.image} 
                alt={selectedSpot.name} 
                className="w-full h-64 md:h-80 object-cover"
              />
              <button 
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {selectedSpot.hasVR && (
                  <button className="bg-secondary text-white px-4 py-2 rounded-md flex items-center">
                    <FaIcons.FaVrCardboard className="mr-2" /> View in VR
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedSpot.name}</h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaIcons.FaMapMarkerAlt className="mr-2" />
                    <span>{selectedSpot.location}</span>
                  </div>
                </div>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedSpot.category.charAt(0).toUpperCase() + selectedSpot.category.slice(1)}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">About</h3>
                <p className="text-gray-700">{selectedSpot.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaIcons.FaClock className="text-primary mr-2" />
                    <h4 className="font-semibold">Timings</h4>
                  </div>
                  <p>{selectedSpot.timings}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaIcons.FaCalendarAlt className="text-primary mr-2" />
                    <h4 className="font-semibold">Best Time to Visit</h4>
                  </div>
                  <p>{selectedSpot.bestTime}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">How to Reach</h3>
                <p className="text-gray-700">Information about how to reach {selectedSpot.name} from major cities and transportation options.</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Map</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Google Maps integration would be here</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary text-white font-medium py-2 px-6 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Itinerary
                </button>
                
                <button className="flex-1 border border-primary text-primary font-medium py-2 px-6 rounded-md hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
                  <FaIcons.FaUserFriends className="mr-2" />
                  Book Local Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;