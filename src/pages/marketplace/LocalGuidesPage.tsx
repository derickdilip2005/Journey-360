import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaLanguage, FaCertificate, FaPhone, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { MdVerified, MdPeople, MdAccessTime } from 'react-icons/md';

interface Guide {
  id: string;
  name: string;
  avatar: string;
  location: string;
  languages: string[];
  experience: number;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  description: string;
  verified: boolean;
  availability: 'available' | 'busy' | 'unavailable';
  responseTime: string;
  completedTours: number;
  contact: {
    phone: string;
    email: string;
  };
  gallery: string[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

const LocalGuidesPage: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const guides: Guide[] = [
    {
      id: '1',
      name: 'Ravi Kumar Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      location: 'Ranchi, Jharkhand',
      languages: ['Hindi', 'English', 'Santhali', 'Mundari'],
      experience: 8,
      pricePerDay: 2500,
      rating: 4.9,
      reviewCount: 47,
      specialties: ['Cultural Tours', 'Tribal Heritage', 'Nature Walks'],
      description: 'Experienced guide specializing in tribal culture and heritage sites. Born and raised in Jharkhand with deep knowledge of local traditions.',
      verified: true,
      availability: 'available',
      responseTime: 'Within 2 hours',
      completedTours: 156,
      contact: {
        phone: '+91 98765 43210',
        email: 'ravi.guide@email.com'
      },
      gallery: [
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
      ],
      reviews: [
        {
          id: '1',
          author: 'Sarah Johnson',
          rating: 5,
          comment: 'Ravi was an excellent guide! His knowledge of tribal culture is incredible.',
          date: '2024-01-15'
        }
      ]
    },
    {
      id: '2',
      name: 'Sunita Devi',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      location: 'Hazaribagh, Jharkhand',
      languages: ['Hindi', 'English', 'Bengali'],
      experience: 6,
      pricePerDay: 2000,
      rating: 4.8,
      reviewCount: 32,
      specialties: ['Wildlife Tours', 'Eco-Tourism', 'Photography'],
      description: 'Wildlife enthusiast and certified naturalist guide. Expert in Betla National Park and surrounding wildlife sanctuaries.',
      verified: true,
      availability: 'available',
      responseTime: 'Within 1 hour',
      completedTours: 89,
      contact: {
        phone: '+91 87654 32109',
        email: 'sunita.wildlife@email.com'
      },
      gallery: [
        'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'
      ],
      reviews: [
        {
          id: '1',
          author: 'Mike Chen',
          rating: 5,
          comment: 'Amazing wildlife tour! Sunita spotted animals we never would have seen.',
          date: '2024-01-10'
        }
      ]
    },
    {
      id: '3',
      name: 'Amit Mahato',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      location: 'Dumka, Jharkhand',
      languages: ['Hindi', 'English', 'Santhali'],
      experience: 10,
      pricePerDay: 3000,
      rating: 4.7,
      reviewCount: 63,
      specialties: ['Adventure Tours', 'Trekking', 'Rock Climbing'],
      description: 'Adventure sports specialist with certifications in rock climbing and trekking. Perfect for thrill-seekers and adventure enthusiasts.',
      verified: true,
      availability: 'busy',
      responseTime: 'Within 4 hours',
      completedTours: 203,
      contact: {
        phone: '+91 76543 21098',
        email: 'amit.adventure@email.com'
      },
      gallery: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
        'https://images.unsplash.com/photo-1464822759844-d150baec93c5?w=400'
      ],
      reviews: [
        {
          id: '1',
          author: 'Lisa Wang',
          rating: 5,
          comment: 'Incredible trekking experience! Amit is very knowledgeable and safety-conscious.',
          date: '2024-01-08'
        }
      ]
    },
    {
      id: '4',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      location: 'Chaibasa, Jharkhand',
      languages: ['Hindi', 'English', 'Ho', 'Mundari'],
      experience: 5,
      pricePerDay: 1800,
      rating: 4.6,
      reviewCount: 28,
      specialties: ['Historical Sites', 'Archaeological Tours', 'Local Cuisine'],
      description: 'History graduate with expertise in archaeological sites and historical monuments. Also offers culinary tours featuring local cuisine.',
      verified: true,
      availability: 'available',
      responseTime: 'Within 3 hours',
      completedTours: 67,
      contact: {
        phone: '+91 65432 10987',
        email: 'priya.history@email.com'
      },
      gallery: [
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
      ],
      reviews: [
        {
          id: '1',
          author: 'David Brown',
          rating: 4,
          comment: 'Great historical insights and delicious food recommendations!',
          date: '2024-01-05'
        }
      ]
    },
    {
      id: '5',
      name: 'Kailash Oraon',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
      location: 'Jamshedpur, Jharkhand',
      languages: ['Hindi', 'English', 'Kurukh', 'Oraon'],
      experience: 12,
      pricePerDay: 3500,
      rating: 4.9,
      reviewCount: 78,
      specialties: ['Tribal Culture', 'Folk Music', 'Traditional Crafts'],
      description: 'Senior guide and cultural expert from the Oraon tribe. Offers immersive experiences in tribal traditions, music, and crafts.',
      verified: true,
      availability: 'available',
      responseTime: 'Within 1 hour',
      completedTours: 289,
      contact: {
        phone: '+91 54321 09876',
        email: 'kailash.tribal@email.com'
      },
      gallery: [
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
      ],
      reviews: [
        {
          id: '1',
          author: 'Emma Wilson',
          rating: 5,
          comment: 'Kailash provided an authentic and deeply moving cultural experience.',
          date: '2024-01-12'
        }
      ]
    }
  ];

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'cultural', name: 'Cultural Tours' },
    { id: 'wildlife', name: 'Wildlife Tours' },
    { id: 'adventure', name: 'Adventure Tours' },
    { id: 'historical', name: 'Historical Sites' },
    { id: 'tribal', name: 'Tribal Culture' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'budget', name: 'Under ₹2000' },
    { id: 'mid', name: '₹2000 - ₹3000' },
    { id: 'premium', name: 'Above ₹3000' }
  ];

  const filteredGuides = guides.filter(guide => {
    const specialtyMatch = selectedSpecialty === 'all' || 
      guide.specialties.some(s => s.toLowerCase().includes(selectedSpecialty));
    
    let priceMatch = true;
    if (priceRange === 'budget') priceMatch = guide.pricePerDay < 2000;
    else if (priceRange === 'mid') priceMatch = guide.pricePerDay >= 2000 && guide.pricePerDay <= 3000;
    else if (priceRange === 'premium') priceMatch = guide.pricePerDay > 3000;
    
    return specialtyMatch && priceMatch;
  });

  const handleHireGuide = (guide: Guide) => {
    if (guide.availability === 'unavailable') {
      alert('This guide is currently unavailable.');
      return;
    }
    alert(`Hiring request sent to ${guide.name}! They will contact you within ${guide.responseTime.toLowerCase()}.`);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600';
      case 'busy': return 'text-yellow-600';
      case 'unavailable': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'unavailable': return 'Unavailable';
      default: return 'Unknown';
    }
  };

  const ProfileModal = () => {
    if (!selectedGuide) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <img
                  src={selectedGuide.avatar}
                  alt={selectedGuide.name}
                  className="w-20 h-20 rounded-full mr-4"
                />
                <div>
                  <div className="flex items-center mb-2">
                    <h2 className="text-2xl font-bold mr-3">{selectedGuide.name}</h2>
                    {selectedGuide.verified && (
                      <MdVerified className="text-blue-500 mr-2" title="Verified Guide" />
                    )}
                  </div>
                  <p className="text-gray-600">{selectedGuide.location}</p>
                  <div className="flex items-center mt-1">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{selectedGuide.rating}</span>
                    <span className="text-gray-600 ml-1">({selectedGuide.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-gray-600 mb-4">{selectedGuide.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedGuide.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedGuide.languages.map((language, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Details</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <MdAccessTime className="mr-2 text-gray-500" />
                    <span>{selectedGuide.experience} years experience</span>
                  </div>
                  <div className="flex items-center">
                    <MdPeople className="mr-2 text-gray-500" />
                    <span>{selectedGuide.completedTours} completed tours</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-medium ${getAvailabilityColor(selectedGuide.availability)}`}>
                      {getAvailabilityText(selectedGuide.availability)}
                    </span>
                  </div>
                </div>



                <h3 className="text-lg font-semibold mb-3">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-gray-500" />
                    <span>{selectedGuide.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-500" />
                    <span>{selectedGuide.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Recent Reviews</h3>
              <div className="space-y-3">
                {selectedGuide.reviews.map(review => (
                  <div key={review.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.author}</span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">₹{selectedGuide.pricePerDay}</div>
                <div className="text-gray-600">per day</div>
              </div>
              <button
                onClick={() => handleHireGuide(selectedGuide)}
                disabled={selectedGuide.availability === 'unavailable'}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  selectedGuide.availability === 'unavailable'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                Hire Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hire a Local Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Connect with verified local guides for authentic Jharkhand experiences
            </p>
            <div className="flex items-center justify-center space-x-6 text-lg">
              <div className="flex items-center">
                <MdVerified className="mr-2" />
                Verified Guides
              </div>
              <div className="flex items-center">
                <FaCertificate className="mr-2" />
                Blockchain Certified
              </div>
              <div className="flex items-center">
                <FaShieldAlt className="mr-2" />
                Secure Booking
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Specialty</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              {specialties.map(specialty => (
                <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
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

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={guide.avatar}
                  alt={guide.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {guide.verified && (
                    <div className="bg-blue-500 text-white p-2 rounded-full" title="Verified Guide">
                      <MdVerified />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{guide.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{guide.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{guide.rating}</span>
                      <span className="text-gray-600 ml-1">({guide.reviewCount})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">₹{guide.pricePerDay}</div>
                    <div className="text-gray-600">per day</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <MdAccessTime className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">{guide.experience} years experience</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className={`text-sm font-medium ${getAvailabilityColor(guide.availability)}`}>
                      {getAvailabilityText(guide.availability)}
                    </span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {guide.specialties.slice(0, 2).map((specialty, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                    {guide.specialties.length > 2 && (
                      <span className="text-gray-500 text-xs">+{guide.specialties.length - 2}</span>
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaLanguage className="mr-2" />
                    <span>{guide.languages.slice(0, 2).join(', ')}</span>
                    {guide.languages.length > 2 && <span> +{guide.languages.length - 2}</span>}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedGuide(guide);
                      setShowProfileModal(true);
                    }}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleHireGuide(guide)}
                    disabled={guide.availability === 'unavailable'}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      guide.availability === 'unavailable'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                  >
                    Hire Guide
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Verified Guides?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center">
              <MdVerified className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Profiles</h3>
              <p className="text-gray-600">
                Every guide undergoes thorough verification including background checks
              </p>
            </div>
            <div className="text-center">
              <FaShieldAlt className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Booking</h3>
              <p className="text-gray-600">
                Safe and secure booking process with payment protection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && <ProfileModal />}
    </div>
  );
};

export default LocalGuidesPage;