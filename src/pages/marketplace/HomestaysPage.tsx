import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaWifi, FaCar, FaUtensils, FaStar, FaMapMarkerAlt, FaComments, FaCalendarAlt } from 'react-icons/fa';
import { MdVerified, MdPeople } from 'react-icons/md';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface Homestay {
  id: string;
  name: string;
  pricePerNight: number;
  images: string[];
  location: string;
  description: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  host: {
    name: string;
    avatar: string;
    verified: boolean;
    responseTime: string;
    languages: string[];
  };
  maxGuests: number;
  rooms: number;
  bathrooms: number;
  available: boolean;
}

const HomestaysPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const homestays: Homestay[] = [
    {
      id: '1',
      name: 'Traditional Tribal Homestay',
      pricePerNight: 1500,
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'
      ],
      location: 'Ranchi, Jharkhand',
      description: 'Experience authentic tribal culture in this traditional homestay surrounded by nature.',
      amenities: ['WiFi', 'Home-cooked meals', 'Cultural activities', 'Nature walks'],
      rating: 4.8,
      reviewCount: 24,
      host: {
        name: 'Sunita Devi',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        verified: true,
        responseTime: 'Within 1 hour',
        languages: ['Hindi', 'English', 'Santhali']
      },
      maxGuests: 6,
      rooms: 3,
      bathrooms: 2,
      available: true
    },
    {
      id: '2',
      name: 'Eco-Friendly Forest Retreat',
      pricePerNight: 2200,
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600'
      ],
      location: 'Hazaribagh, Jharkhand',
      description: 'Sustainable eco-lodge with solar power and organic farming experiences.',
      amenities: ['Solar power', 'Organic meals', 'Farming activities', 'Bird watching'],
      rating: 4.9,
      reviewCount: 18,
      host: {
        name: 'Rajesh Kumar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        verified: true,
        responseTime: 'Within 2 hours',
        languages: ['Hindi', 'English']
      },
      maxGuests: 4,
      rooms: 2,
      bathrooms: 2,
      available: true
    },
    {
      id: '3',
      name: 'Lakeside Heritage Home',
      pricePerNight: 1800,
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600'
      ],
      location: 'Dumka, Jharkhand',
      description: 'Beautiful heritage home by the lake with traditional architecture and modern amenities.',
      amenities: ['Lake view', 'WiFi', 'Air conditioning', 'Traditional cuisine'],
      rating: 4.7,
      reviewCount: 31,
      host: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        verified: true,
        responseTime: 'Within 30 minutes',
        languages: ['Hindi', 'English', 'Bengali']
      },
      maxGuests: 8,
      rooms: 4,
      bathrooms: 3,
      available: true
    },
    {
      id: '4',
      name: 'Mountain View Cottage',
      pricePerNight: 2500,
      images: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600'
      ],
      location: 'Chaibasa, Jharkhand',
      description: 'Cozy cottage with stunning mountain views and adventure activities.',
      amenities: ['Mountain view', 'Trekking guides', 'Bonfire', 'Local cuisine'],
      rating: 4.6,
      reviewCount: 15,
      host: {
        name: 'Amit Singh',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        verified: true,
        responseTime: 'Within 3 hours',
        languages: ['Hindi', 'English']
      },
      maxGuests: 5,
      rooms: 2,
      bathrooms: 2,
      available: false
    }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'ranchi', name: 'Ranchi' },
    { id: 'hazaribagh', name: 'Hazaribagh' },
    { id: 'dumka', name: 'Dumka' },
    { id: 'chaibasa', name: 'Chaibasa' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'budget', name: 'Under ₹2000' },
    { id: 'mid', name: '₹2000 - ₹3000' },
    { id: 'luxury', name: 'Above ₹3000' }
  ];

  const filteredHomestays = homestays.filter(homestay => {
    const locationMatch = selectedLocation === 'all' || 
      homestay.location.toLowerCase().includes(selectedLocation);
    
    let priceMatch = true;
    if (priceRange === 'budget') priceMatch = homestay.pricePerNight < 2000;
    else if (priceRange === 'mid') priceMatch = homestay.pricePerNight >= 2000 && homestay.pricePerNight <= 3000;
    else if (priceRange === 'luxury') priceMatch = homestay.pricePerNight > 3000;
    
    return locationMatch && priceMatch;
  });

  const handleBookStay = (homestay: Homestay) => {
    setSelectedHomestay(homestay);
    setShowBookingModal(true);
  };

  const handleChatWithHost = (homestay: Homestay) => {
    setSelectedHomestay(homestay);
    setShowChatModal(true);
  };

  const BookingModal = () => {
    if (!selectedHomestay) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowBookingModal(false);
          }
        }}
      >
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <h3 className="text-2xl font-bold mb-4">Book Your Stay</h3>
          <div className="mb-4">
            <h4 className="font-semibold">{selectedHomestay.name}</h4>
            <p className="text-gray-600">{selectedHomestay.location}</p>
            <p className="text-orange-600 font-bold">₹{selectedHomestay.pricePerNight}/night</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Check-in Date</label>
              <input type="date" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Check-out Date</label>
              <input type="date" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Guests</label>
              <select className="w-full border rounded-lg px-3 py-2">
                {Array.from({ length: selectedHomestay.maxGuests }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowBookingModal(false)}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Booking confirmed! You will receive a confirmation email shortly.');
                setShowBookingModal(false);
              }}
              className="flex-1 py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ChatModal = () => {
    if (!selectedHomestay) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowChatModal(false);
          }
        }}
      >
        <div className="bg-white rounded-xl max-w-md w-full p-6 h-96">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={selectedHomestay.host.avatar}
                alt={selectedHomestay.host.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{selectedHomestay.host.name}</h3>
                <p className="text-sm text-gray-600">Usually responds {selectedHomestay.host.responseTime}</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="border rounded-lg p-4 h-48 mb-4 bg-gray-50">
            <div className="text-center text-gray-500 mt-16">
              Start a conversation with your host
            </div>
          </div>
          
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-l-lg px-3 py-2"
            />
            <button className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700">
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Verified Homestays
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Stay with local families and experience authentic Jharkhand culture
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Homestays Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredHomestays.map((homestay, index) => (
            <motion.div
              key={homestay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={homestay.images[0]}
                  alt={homestay.name}
                  className="w-full h-64 object-cover"
                />
                {!homestay.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Not Available</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{homestay.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{homestay.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{homestay.rating}</span>
                      <span className="text-gray-600 ml-1">({homestay.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">₹{homestay.pricePerNight}</div>
                    <div className="text-gray-600">per night</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{homestay.description}</p>

                {/* Property Details */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MdPeople className="mr-1" />
                    <span>{homestay.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <FaBed className="mr-1" />
                    <span>{homestay.rooms} rooms</span>
                  </div>
                  <div className="flex items-center">
                    <span>{homestay.bathrooms} bathrooms</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {homestay.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {amenity}
                      </span>
                    ))}
                    {homestay.amenities.length > 3 && (
                      <span className="text-gray-500 text-sm">+{homestay.amenities.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Host Info */}
                <div className="border-t pt-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={homestay.host.avatar}
                        alt={homestay.host.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{homestay.host.name}</span>
                          {homestay.host.verified && (
                            <MdVerified className="ml-2 text-blue-500" title="Verified Host" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          Speaks: {homestay.host.languages.join(', ')}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleChatWithHost(homestay)}
                      className="flex items-center text-orange-600 hover:text-orange-700"
                    >
                      <FaComments className="mr-1" />
                      Chat
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleBookStay(homestay)}
                  disabled={!homestay.available}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
                    homestay.available
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaCalendarAlt className="mr-2" />
                  {homestay.available ? 'Book Stay' : 'Not Available'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showBookingModal && <BookingModal />}
      {showChatModal && <ChatModal />}
    </div>
  );
};

export default HomestaysPage;