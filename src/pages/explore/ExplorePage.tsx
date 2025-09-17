import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import LeafletMap from '../../components/LeafletMap';

interface IndianState {
  id: number;
  name: string;
  region: string;
  capital: string;
  description: string;
  image: string;
  touristSpots: TouristSpot[];
}

interface TouristSpot {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  activities: string[];
  localFood: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  bestTime: string;
  timings: string;
  hasVR: boolean;
  hasAR: boolean;
  coords: { lat: number; lng: number };
}

const indianStates: IndianState[] = [
  {
    id: 9,
    name: 'Jharkhand',
    region: 'east',
    capital: 'Ranchi',
    description: 'Known for its waterfalls, tribal culture, wildlife sanctuaries, and mineral-rich landscapes.',
    image: 'https://images.unsplash.com/photo-1619500765355-8ba767d6e261?q=80&w=1297&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 901,
        name: 'Hundru Falls',
        category: 'nature',
        description: 'One of the highest waterfalls in Jharkhand, offering spectacular views and natural beauty.',
        image: 'https://images.unsplash.com/photo-1558451701-4662b9367fc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Waterfall Viewing', 'Photography', 'Trekking', 'Picnicking'],
        localFood: ['Litti Chokha', 'Dhuska', 'Rugra', 'Handia'],
        dosAndDonts: {
          dos: ['Wear non-slip shoes', 'Carry water', 'Visit during daylight'],
          donts: ['Swim during monsoon', 'Go too close to edge', 'Litter around']
        },
        bestTime: 'October to March',
        timings: '6:00 AM - 6:00 PM',
        hasVR: true,
        hasAR: true,
        coords: { lat: 23.3441, lng: 85.3096 }
      },
      {
        id: 902,
        name: 'Betla National Park',
        category: 'nature',
        description: 'Wildlife sanctuary known for tigers, elephants, and diverse flora and fauna.',
        image: 'https://plus.unsplash.com/premium_photo-1733493684000-9e32eaf89c60?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Wildlife Safari', 'Bird Watching', 'Photography', 'Nature Walks'],
        localFood: ['Tribal Cuisine', 'Bamboo Shoot Curry', 'Mahua', 'Forest Honey'],
        dosAndDonts: {
          dos: ['Book safari in advance', 'Follow guide instructions', 'Carry binoculars'],
          donts: ['Make loud noises', 'Feed animals', 'Litter in forest']
        },
        bestTime: 'November to April',
        timings: '6:00 AM - 6:00 PM',
        hasVR: false,
        hasAR: true,
        coords: { lat: 23.8859, lng: 84.1952 }
      },
      {
        id: 903,
        name: 'Ranchi Hill Station',
        category: 'nature',
        description: 'Capital city surrounded by hills, waterfalls, and pleasant climate.',
        image: 'https://images.unsplash.com/photo-1751815562767-2adcf527820c?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Hill Trekking', 'Temple Visits', 'Lake Boating', 'Photography'],
        localFood: ['Thekua', 'Pittha', 'Arsa', 'Kheer Mohan'],
        dosAndDonts: {
          dos: ['Visit Tagore Hill', 'Try local sweets', 'Explore Rock Garden'],
          donts: ['Miss sunset points', 'Ignore tribal culture', 'Litter on hills']
        },
        bestTime: 'October to March',
        timings: 'All day',
        hasVR: true,
        hasAR: false,
        coords: { lat: 23.3441, lng: 85.3096 }
      },
      {
        id: 904,
        name: 'Dassam Falls',
        category: 'nature',
        description: 'A beautiful waterfall cascading from a height of 144 feet, perfect for nature lovers.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Waterfall Viewing', 'Photography', 'Rock Climbing', 'Nature Walks'],
        localFood: ['Chilka Roti', 'Malpua', 'Anarsa', 'Pitha'],
        dosAndDonts: {
          dos: ['Wear comfortable shoes', 'Carry camera', 'Visit during monsoon for best views'],
          donts: ['Swim in strong currents', 'Climb wet rocks', 'Leave trash behind']
        },
        bestTime: 'July to February',
        timings: '6:00 AM - 6:00 PM',
        hasVR: true,
        hasAR: true,
        coords: { lat: 23.6102, lng: 85.5917 }
      },
      {
        id: 905,
        name: 'Jagannath Temple Ranchi',
        category: 'spiritual',
        description: 'A replica of the famous Puri Jagannath Temple, significant for Hindu pilgrims.',
        image: 'https://xplro.com/wp-content/uploads/2024/06/Untitled-design-73.jpg.webp',
        activities: ['Temple Visits', 'Prayer Services', 'Festival Celebrations', 'Cultural Programs'],
        localFood: ['Prasadam', 'Kheer', 'Laddu', 'Puri Sabji'],
        dosAndDonts: {
          dos: ['Dress modestly', 'Remove shoes before entering', 'Maintain silence'],
          donts: ['Use mobile phones inside', 'Touch idols', 'Wear leather items']
        },
        bestTime: 'October to March',
        timings: '5:00 AM - 9:00 PM',
        hasVR: false,
        hasAR: true,
        coords: { lat: 23.3569, lng: 85.3350 }
      }
    ]
  }
];

const ExplorePage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<IndianState | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  const handleGetDirections = (spot: TouristSpot) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.coords.lat},${spot.coords.lng}`;
    window.open(url, '_blank');
  };

  const handleShowCabFare = (spot: TouristSpot) => {
    // Get user's current location and redirect to Uber
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pickup = {
            addressLine1: "Current Location",
            addressLine2: "Your Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            source: "SEARCH",
            provider: "google_places"
          };
          
          const destination = {
            addressLine1: spot.name,
            addressLine2: `${spot.name}, Jharkhand`,
            latitude: spot.coords.lat,
            longitude: spot.coords.lng,
            source: "SEARCH",
            provider: "google_places"
          };
          
          const uberUrl = `https://m.uber.com/go/product-selection?drop%5B0%5D=${encodeURIComponent(JSON.stringify(destination))}&pickup=${encodeURIComponent(JSON.stringify(pickup))}`;
          window.open(uberUrl, '_blank');
        },
        (error) => {
          // Fallback if location access is denied
          const destination = {
            addressLine1: spot.name,
            addressLine2: `${spot.name}, Jharkhand`,
            latitude: spot.coords.lat,
            longitude: spot.coords.lng,
            source: "SEARCH",
            provider: "google_places"
          };
          
          const uberUrl = `https://m.uber.com/go/product-selection?drop%5B0%5D=${encodeURIComponent(JSON.stringify(destination))}`;
          window.open(uberUrl, '_blank');
        }
      );
    } else {
      // Fallback for browsers without geolocation
      const destination = {
        addressLine1: spot.name,
        addressLine2: `${spot.name}, Jharkhand`,
        latitude: spot.coords.lat,
        longitude: spot.coords.lng,
        source: "SEARCH",
        provider: "google_places"
      };
      
      const uberUrl = `https://m.uber.com/go/product-selection?drop%5B0%5D=${encodeURIComponent(JSON.stringify(destination))}`;
      window.open(uberUrl, '_blank');
    }
  };

  const handleShowVR = (spot: TouristSpot) => {
    // This would open VR experience for the location
    alert(`VR Experience for ${spot.name} - Opening VR viewer...`);
    // In a real implementation, this would launch a VR viewer or redirect to VR content
  };

  const handleShowAR = (spot: TouristSpot) => {
    // This would open AR experience for the location
    alert(`AR Guide for ${spot.name} - Opening AR experience...`);
    // In a real implementation, this would launch AR camera or redirect to AR content
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore India</h1>
              <p className="text-gray-600 mt-1">Discover amazing destinations across the country</p>
            </div>
            <button
              onClick={() => setShowMap(!showMap)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaIcons.FaMap />
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      {showMap && selectedSpot && (
        <LeafletMap
          destinationName={selectedSpot.name}
          destinationCoords={selectedSpot.coords}
          onClose={() => setShowMap(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Jharkhand</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the natural beauty, rich culture, and magnificent attractions of Jharkhand. 
              From stunning waterfalls to ancient temples, experience the heart of India.
            </p>
          </div>
        </div>
        {/* Tourist spots */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Discover Amazing Places in Jharkhand</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {indianStates[0].touristSpots.map((spot) => (
                <motion.div
                  key={spot.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${spot.image})` }}>
                    <div className="h-full bg-black bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-xl font-bold">{spot.name}</h3>
                        <span className="text-sm opacity-90 capitalize">{spot.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{spot.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Activities</h4>
                        <div className="flex flex-wrap gap-2">
                          {spot.activities.map((activity, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Local Delicacies</h4>
                        <div className="flex flex-wrap gap-2">
                          {spot.localFood.map((food, index) => (
                            <span key={index} className="text-xs bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Travel Tips</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <h5 className="text-sm font-medium text-green-700 mb-1">Do's</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {spot.dosAndDonts.dos.map((item, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <span className="text-green-500 mt-0.5">✓</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-red-700 mb-1">Don'ts</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {spot.dosAndDonts.donts.map((item, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <span className="text-red-500 mt-0.5">✗</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <div>
                          <span className="font-medium">Best Time:</span> {spot.bestTime}
                        </div>
                        <div>
                          <span className="font-medium">Timings:</span> {spot.timings}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleShowVR(spot)}
                          className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-purple-200 transition-colors cursor-pointer"
                        >
                          <FaIcons.FaVrCardboard /> VR Experience
                        </button>
                        <button
                          onClick={() => handleShowAR(spot)}
                          className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-green-200 transition-colors cursor-pointer"
                        >
                          <FaIcons.FaMobile /> AR Guide
                        </button>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleGetDirections(spot)}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FaIcons.FaDirections />
                          Get Directions
                        </button>
                        <button
                          onClick={() => handleShowCabFare(spot)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FaIcons.FaTaxi />
                          Cab Fare
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
      </div>
    </div>
  );
};

export default ExplorePage;