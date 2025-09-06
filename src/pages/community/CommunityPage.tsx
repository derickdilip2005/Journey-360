import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

// Types
interface LocalGuide {
  id: number;
  name: string;
  photo: string;
  location: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  specialties: string[];
  price: string;
  verified: boolean;
  impactScore: number;
}

interface Experience {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviewCount: number;
  image: string;
  guide: {
    name: string;
    photo: string;
  };
  impactDescription: string;
}

interface TravelStory {
  id: number;
  title: string;
  author: {
    name: string;
    photo: string;
  };
  date: string;
  location: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
}

// Sample data
const localGuides: LocalGuide[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    location: 'Delhi',
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 4.9,
    reviewCount: 127,
    specialties: ['Historical Sites', 'Street Food', 'Cultural Tours'],
    price: '₹2,000/day',
    verified: true,
    impactScore: 92,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    location: 'Jaipur, Rajasthan',
    languages: ['English', 'Hindi', 'Rajasthani'],
    rating: 4.8,
    reviewCount: 93,
    specialties: ['Palace Tours', 'Local Crafts', 'Desert Safari'],
    price: '₹1,800/day',
    verified: true,
    impactScore: 88,
  },
  {
    id: 3,
    name: 'Arjun Nair',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    location: 'Kerala',
    languages: ['English', 'Hindi', 'Malayalam'],
    rating: 4.7,
    reviewCount: 78,
    specialties: ['Backwater Tours', 'Spice Gardens', 'Ayurveda'],
    price: '₹1,600/day',
    verified: true,
    impactScore: 85,
  },
  {
    id: 4,
    name: 'Meera Patel',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
    location: 'Goa',
    languages: ['English', 'Hindi', 'Konkani'],
    rating: 4.9,
    reviewCount: 112,
    specialties: ['Beach Tours', 'Portuguese Heritage', 'Water Sports'],
    price: '₹1,500/day',
    verified: true,
    impactScore: 94,
  },
];

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Rajasthani Village & Craft Workshop',
    location: 'Jaipur, Rajasthan',
    duration: '1 Day',
    price: '₹2,800/person',
    rating: 4.9,
    reviewCount: 48,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1484&q=80',
    guide: {
      name: 'Priya Sharma',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    },
    impactDescription: '80% of your payment goes directly to local artisans and village community',
  },
  {
    id: 2,
    title: 'Kerala Backwater & Spice Garden Tour',
    location: 'Alleppey, Kerala',
    duration: '2 Days',
    price: '₹4,200/person',
    rating: 4.8,
    reviewCount: 72,
    image: 'https://images.unsplash.com/photo-1623058324456-686d39200145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    guide: {
      name: 'Arjun Nair',
      photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    impactDescription: 'Supports local fishermen families and sustainable tourism practices',
  },
  {
    id: 3,
    title: 'Goa Heritage & Beach Experience',
    location: 'Old Goa',
    duration: '1 Day',
    price: '₹2,200/person',
    rating: 4.9,
    reviewCount: 36,
    image: 'https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    guide: {
      name: 'Meera Patel',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
    },
    impactDescription: '20% of proceeds support local heritage preservation projects',
  },
];

const travelStories: TravelStory[] = [
  {
    id: 1,
    title: "My Incredible Journey Across India's Golden Triangle",
    author: {
      name: 'Amit Sharma',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    date: 'June 15, 2023',
    location: 'Delhi, Agra, Jaipur',
    content: 'What started as a classic tourist route turned into the most enriching cultural experience of my life. From the bustling streets of Delhi to the majestic Taj Mahal and the royal palaces of Jaipur, India surprised me at every turn...',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    likes: 248,
    comments: 42,
  },
  {
    id: 2,
    title: 'Kerala Backwaters: A Journey of Serenity and Spices',
    author: {
      name: 'Meera Patel',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    date: 'May 3, 2023',
    location: 'Alleppey, Kerala',
    content: 'My week-long houseboat journey through Kerala\'s backwaters was a perfect blend of tranquility and cultural immersion. From spice plantation tours to traditional Ayurvedic treatments, Kerala offered a unique perspective on India\'s diverse heritage...',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1484&q=80',
    likes: 312,
    comments: 57,
  },
  {
    id: 3,
    title: "A Photographer's Guide to Capturing India's Diverse Landscapes",
    author: {
      name: 'Vikram Mehta',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    date: 'April 22, 2023',
    location: 'Various locations across India',
    content: 'As a landscape photographer, India offered me countless opportunities to capture breathtaking scenes. From the snow-capped Himalayas to the golden deserts of Rajasthan, here are my tips for photographing this incredible country...',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    likes: 189,
    comments: 31,
  },
];

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guides' | 'experiences' | 'stories'>('guides');
  const [selectedGuide, setSelectedGuide] = useState<LocalGuide | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedStory, setSelectedStory] = useState<TravelStory | null>(null);

  // For testimonial carousel
  const testimonials = [
    {
      text: "Our guide Rajesh made our trip to India unforgettable. His knowledge of Delhi's history and hidden gems gave us experiences we couldn't have found on our own.",
      author: "Sarah Johnson",
      location: "United Kingdom"
    },
    {
      text: "The Rajasthani village tour was the highlight of our India trip. Authentic, respectful, and eye-opening. Highly recommend booking with local guides through this platform.",
      author: "Michael Chen",
      location: "Singapore"
    },
    {
      text: "As a solo female traveler, I felt completely safe and welcomed. My guide Priya was knowledgeable and helped me connect with local communities in a meaningful way.",
      author: "Emma Rodriguez",
      location: "Spain"
    }
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1484&q=80')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Community & Impact</h1>
          <p className="text-xl max-w-3xl">Connect with local guides, discover authentic experiences, and make a positive impact</p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-8 relative z-20 mb-8">
          <div className="relative">
            <div className="text-center py-6 px-4">
              <FaIcons.FaQuoteLeft className="text-primary text-opacity-20 text-4xl absolute top-0 left-0 mt-4 ml-4" />
              <p className="text-lg text-gray-700 mb-4 px-12">{testimonials[currentTestimonial].text}</p>
              <FaIcons.FaQuoteRight className="text-primary text-opacity-20 text-4xl absolute bottom-0 right-0 mb-4 mr-4" />
              <div className="mt-6">
                <p className="font-semibold">{testimonials[currentTestimonial].author}</p>
                <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].location}</p>
              </div>
            </div>
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-primary hover:bg-gray-100"
            >
              <FaIcons.FaChevronLeft />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-primary hover:bg-gray-100"
            >
              <FaIcons.FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-4 px-6 font-medium ${activeTab === 'guides' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('guides')}
            >
              <FaIcons.FaUserFriends className="inline mr-2" /> Local Guides
            </button>
            <button
              className={`py-4 px-6 font-medium ${activeTab === 'experiences' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('experiences')}
            >
              <FaIcons.FaMapMarkerAlt className="inline mr-2" /> Experiences
            </button>
            <button
              className={`py-4 px-6 font-medium ${activeTab === 'stories' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('stories')}
            >
              <FaIcons.FaComment className="inline mr-2" /> Travel Stories
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'guides' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Verified Local Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {localGuides.map((guide) => (
                    <motion.div 
                      key={guide.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onClick={() => setSelectedGuide(guide)}
                    >
                      <div className="relative">
                        <img 
                          src={guide.photo} 
                          alt={guide.name} 
                          className="w-full h-48 object-cover"
                        />
                        {guide.verified && (
                          <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 m-2 rounded-full text-xs font-medium">
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold">{guide.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <FaIcons.FaMapMarkerAlt className="mr-1" />
                          <span>{guide.location}</span>
                        </div>
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400 mr-1">
                            <FaIcons.FaStar />
                          </div>
                          <span className="font-medium">{guide.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({guide.reviewCount} reviews)</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {guide.specialties.slice(0, 3).map((specialty, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-primary">{guide.price}</span>
                          <button className="text-primary hover:underline text-sm">View Profile</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'experiences' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Local Experiences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experiences.map((experience) => (
                    <motion.div 
                      key={experience.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onClick={() => setSelectedExperience(experience)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={experience.image} 
                          alt={experience.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <div className="flex items-center text-white">
                            <FaIcons.FaCalendarAlt className="mr-2" />
                            <span>{experience.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-1">{experience.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <FaIcons.FaMapMarkerAlt className="mr-1" />
                          <span>{experience.location}</span>
                        </div>
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400 mr-1">
                            <FaIcons.FaStar />
                          </div>
                          <span className="font-medium">{experience.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({experience.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center mb-3">
                          <img 
                            src={experience.guide.photo} 
                            alt={experience.guide.name} 
                            className="w-6 h-6 rounded-full mr-2 object-cover"
                          />
                          <span className="text-sm">With {experience.guide.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-primary">{experience.price}</span>
                          <button className="text-primary hover:underline text-sm">View Details</button>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 border-t border-green-100">
                        <div className="flex items-center text-green-700 text-sm">
                          <FaIcons.FaLeaf className="mr-2 text-green-600" />
                          <span>{experience.impactDescription}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stories' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Travel Stories & Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {travelStories.map((story) => (
                    <motion.div 
                      key={story.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onClick={() => setSelectedStory(story)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2">{story.title}</h3>
                        <div className="flex items-center mb-3">
                          <img 
                            src={story.author.photo} 
                            alt={story.author.name} 
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium">{story.author.name}</p>
                            <p className="text-xs text-gray-500">{story.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <FaIcons.FaMapMarkerAlt className="mr-1" />
                          <span>{story.location}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{story.content}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex space-x-3">
                            <div className="flex items-center">
                              <FaIcons.FaHeart className="mr-1" />
                              <span>{story.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <FaIcons.FaComment className="mr-1" />
                              <span>{story.comments}</span>
                            </div>
                          </div>
                          <button className="text-primary hover:underline">Read More</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
          <p className="text-gray-700 mb-6">When you book experiences through our platform, you're directly contributing to the local economy and supporting sustainable tourism in India.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Economic Impact</h3>
              <p className="text-gray-700">40% of all booking fees go directly to local guides and communities, helping to create sustainable livelihoods.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Cultural Preservation</h3>
              <p className="text-gray-700">Our platform helps preserve traditional knowledge, crafts, and cultural practices by creating economic incentives.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Environmental Conservation</h3>
              <p className="text-gray-700">5% of our profits support local conservation initiatives protecting India's natural beauty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="relative">
              <button 
                onClick={() => setSelectedGuide(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={selectedGuide.photo} 
                    alt={selectedGuide.name} 
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{selectedGuide.name}</h2>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaIcons.FaMapMarkerAlt className="mr-1" />
                        <span>{selectedGuide.location}</span>
                      </div>
                    </div>
                    {selectedGuide.verified && (
                      <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <FaIcons.FaStar key={i} className={i < Math.floor(selectedGuide.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="font-medium ml-1">{selectedGuide.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({selectedGuide.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedGuide.languages.map((language, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedGuide.specialties.map((specialty, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Impact Score</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Community Contribution</span>
                        <span className="font-medium">{selectedGuide.impactScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ width: `${selectedGuide.impactScore}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Booking with {selectedGuide.name} directly supports the local community and sustainable tourism practices.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-primary text-white font-medium py-2 px-6 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center">
                      Book for {selectedGuide.price}
                    </button>
                    
                    <button className="flex-1 border border-primary text-primary font-medium py-2 px-6 rounded-md hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
                      Contact Guide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedExperience.image} 
                alt={selectedExperience.title} 
                className="w-full h-64 md:h-80 object-cover"
              />
              <button 
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedExperience.title}</h2>
                  <div className="flex items-center text-gray-600">
                    <FaIcons.FaMapMarkerAlt className="mr-1" />
                    <span>{selectedExperience.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{selectedExperience.price}</div>
                  <div className="text-gray-500">{selectedExperience.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={selectedExperience.guide.photo} 
                  alt={selectedExperience.guide.name} 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium">Hosted by {selectedExperience.guide.name}</p>
                  <div className="flex items-center text-sm">
                    <div className="flex text-yellow-400 mr-1">
                      <FaIcons.FaStar />
                    </div>
                    <span>{selectedExperience.rating}</span>
                    <span className="text-gray-500 ml-1">({selectedExperience.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Impact</h3>
                <div className="flex items-start">
                  <FaIcons.FaLeaf className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">{selectedExperience.impactDescription}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">What You'll Do</h3>
                <p className="text-gray-700 mb-4">
                  Detailed description of the experience would go here, including the itinerary, what to expect, and what's included.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium mb-1">What's Included</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Transportation from meeting point</li>
                      <li>• Traditional lunch with local family</li>
                      <li>• Guided cultural activities</li>
                      <li>• Souvenir craft item</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium mb-1">What to Bring</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Comfortable walking shoes</li>
                      <li>• Water bottle</li>
                      <li>• Camera</li>
                      <li>• Sun protection</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-primary-dark transition-colors">
                  Book Now
                </button>
                
                <button className="flex-1 border border-primary text-primary font-medium py-3 px-6 rounded-md hover:bg-primary hover:text-white transition-colors">
                  Ask a Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.title} 
                className="w-full h-64 md:h-80 object-cover"
              />
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{selectedStory.title}</h2>
              
              <div className="flex items-center mb-4">
                <img 
                  src={selectedStory.author.photo} 
                  alt={selectedStory.author.name} 
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium">{selectedStory.author.name}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span>{selectedStory.date}</span>
                    <span className="mx-2">•</span>
                    <FaIcons.FaMapMarkerAlt className="mr-1" />
                    <span>{selectedStory.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{selectedStory.content}</p>
                <p className="text-gray-700 mt-4">
                  This would be the full content of the travel story, with multiple paragraphs, possibly images, and detailed descriptions of the traveler's experiences in Jharkhand.
                </p>
                <p className="text-gray-700 mt-4">
                  The story would continue with personal anecdotes, tips for other travelers, and reflections on the cultural experiences and connections made during the journey.
                </p>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <FaIcons.FaHeart className="mr-1" />
                    <span>Like ({selectedStory.likes})</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <FaIcons.FaComment className="mr-1" />
                    <span>Comment ({selectedStory.comments})</span>
                  </button>
                </div>
                <button className="flex items-center text-gray-600 hover:text-primary">
                  <FaIcons.FaShare className="mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;