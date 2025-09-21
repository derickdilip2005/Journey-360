import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import LeafletMap from '../../components/LeafletMap';
import DirectionsMap from '../../components/ui/DirectionsMap';
import VREmbed from '../../components/vr/VREmbed';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import bgImage from '../../assets/Tourist/Explore/bg.png';
import hundruImage from '../../assets/Tourist/Explore/hundru.png';
import betlaImage from '../../assets/Tourist/Explore/Betla.png';
import ranchiImage from '../../assets/Tourist/Explore/ranchi.png';
import dassamImage from '../../assets/Tourist/Explore/dassam.png';
import jagannathImage from '../../assets/Tourist/Explore/jagannath.png';


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
        image: hundruImage,
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
        coords: { lat: 23.4497246, lng: 85.6666868 } // Hundru Falls - Correct coordinates from Jharkhand
      },
      {
        id: 902,
        name: 'Betla National Park',
        category: 'nature',
        description: 'Wildlife sanctuary known for tigers, elephants, and diverse flora and fauna.',
        image: betlaImage,
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
        image: ranchiImage,
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
        coords: { lat: 23.3522, lng: 85.3270 } // Updated to Ranchi city center coordinates
      },
      {
        id: 904,
        name: 'Dassam Falls',
        category: 'nature',
        description: 'A beautiful waterfall cascading from a height of 144 feet, perfect for nature lovers.',
        image: dassamImage,
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
        coords: { lat: 23.6340, lng: 85.5460 } // Updated to nearby accessible road location
      },
      {
        id: 905,
        name: 'Jagannath Temple Ranchi',
        category: 'spiritual',
        description: 'A replica of the famous Puri Jagannath Temple, significant for Hindu pilgrims.',
        image: jagannathImage,
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
        coords: { lat: 23.3569, lng: 85.3350 } // Temple location - likely to have Street View
      }
    ]
  }
];

const ExplorePage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<IndianState | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [showVR, setShowVR] = useState(false);
  const [vrSpot, setVrSpot] = useState<TouristSpot | null>(null);
  const [directionsDestination, setDirectionsDestination] = useState<{lat: number; lng: number; name: string} | null>(null);
  const navigate = useNavigate();

  const handleGetDirections = (spot: TouristSpot) => {
    setDirectionsDestination({
      lat: spot.coords.lat,
      lng: spot.coords.lng,
      name: spot.name
    });
    setShowDirections(true);
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
    console.log('Opening VR for spot:', spot);
    console.log('Environment API Key:', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    setVrSpot(spot);
    setShowVR(true);
  };

  const handleShowAR = (spot: TouristSpot) => {
    // This would open AR experience for the location
    alert(`AR Guide for ${spot.name} - Opening AR experience...`);
    // In a real implementation, this would launch AR camera or redirect to AR content
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay for opacity */}
      <div className="absolute inset-0 bg-white/30"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        
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
              <h1 className="text-4xl font-bold text-white-900 mb-4">Explore Jharkhand</h1>
              <p className="text-lg text-white-600 max-w-3xl mx-auto">
                Discover the natural beauty, rich culture, and magnificent attractions of Jharkhand. 
                From stunning waterfalls to ancient temples, experience the heart of India.
              </p>
            </div>
          </div>
        {/* Tourist spots */}
        <h2 className="text-2xl font-bold text-white-900 mb-6 text-center">Discover Amazing Places in Jharkhand</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {indianStates[0].touristSpots.map((spot) => (
            <motion.div
              key={spot.id}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="overflow-hidden bg-white">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${spot.image})` }}>
                  <div className="h-full bg-black bg-opacity-30 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold">{spot.name}</h3>
                      <span className="text-sm opacity-90 capitalize">{spot.category}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{spot.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Activities</h4>
                      <div className="flex flex-wrap gap-2">
                        {spot.activities.map((activity, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Local Delicacies</h4>
                      <div className="flex flex-wrap gap-2">
                        {spot.localFood.map((food, index) => (
                          <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                            {food}
                          </Badge>
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
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleShowVR(spot)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        <FaIcons.FaVrCardboard className="mr-2" />
                        VR Experience
                      </Button>
                      <Button
                        onClick={() => handleShowAR(spot)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                        size="sm"
                      >
                        <FaIcons.FaMobile className="mr-2" />
                        AR Experience
                      </Button>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleGetDirections(spot)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <FaIcons.FaDirections className="mr-2" />
                        Get Directions
                      </Button>
                      <Button
                        onClick={() => handleShowCabFare(spot)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <FaIcons.FaTaxi className="mr-2" />
                        Cab Fare
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Directions Map Modal */}
      {directionsDestination && (
        <DirectionsMap
          destination={directionsDestination}
          isOpen={showDirections}
          onClose={() => setShowDirections(false)}
        />
      )}

      {/* VR Experience Modal */}
      {vrSpot && showVR && (
        <div className="fixed inset-0 bg-black" style={{ zIndex: 9999 }}>
          {/* Hide chatbot completely by targeting all possible selectors */}
          <style>{`
            .fixed.bottom-6.right-6 { display: none !important; }
            .fixed.bottom-4.right-4 { display: none !important; }
            button[class*="fixed"][class*="bottom"][class*="right"] { display: none !important; }
            div[class*="fixed"][class*="bottom"][class*="right"][class*="z-"] { display: none !important; }
          `}</style>
          
          {/* Top Exit Button */}
          <div className="absolute top-4 right-4" style={{ zIndex: 10001 }}>
            <Button
              onClick={() => setShowVR(false)}
              variant="destructive"
              size="lg"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 shadow-lg"
            >
              <FaIcons.FaTimes className="text-lg" />
              Exit VR
            </Button>
          </div>

          {/* Top Left Exit Button (Alternative) */}
          <div className="absolute top-4 left-4" style={{ zIndex: 10001 }}>
            <Button
              onClick={() => setShowVR(false)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-black/50 border-white/30 text-white hover:bg-white/20"
            >
              <FaIcons.FaArrowLeft />
              Back
            </Button>
          </div>

          {/* Bottom Exit Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2" style={{ zIndex: 10001 }}>
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm text-center">
              <p className="mb-2">Press <kbd className="bg-white/20 px-2 py-1 rounded text-xs">ESC</kbd> or click Exit VR to close</p>
              <Button
                onClick={() => setShowVR(false)}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-none"
              >
                Exit VR Experience
              </Button>
            </div>
          </div>

          {/* Keyboard Event Listener for ESC key */}
          <div
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setShowVR(false);
              }
            }}
            className="w-full h-full outline-none"
            autoFocus
          >
            <VREmbed
              locationName={vrSpot.name}
              onExit={() => setShowVR(false)}
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ExplorePage;