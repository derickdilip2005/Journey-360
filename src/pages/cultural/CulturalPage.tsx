import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { Loader } from '@googlemaps/js-api-loader';

// Types
interface CulturalLesson {
  id: number;
  title: string;
  category: 'etiquette' | 'food' | 'festivals' | 'traditions' | 'art';
  description: string;
  image: string;
  hasAR?: boolean;
  hasVR?: boolean;
}

interface VRExperience {
  id: number;
  title: string;
  location: string;
  description: string;
  image: string;
  vrLink: string;
}

// Sample data
const culturalLessons: CulturalLesson[] = [
  {
    id: 1,
    title: 'Sarhul Festival',
    category: 'festivals',
    description: 'Learn about Sarhul, a major tribal festival celebrating the beginning of spring and the flowering of the Sal tree.',
    image: 'https://images.unsplash.com/photo-1624628639856-100bf817a8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    hasAR: true,
  },
  {
    id: 2,
    title: 'Tribal Greetings and Customs',
    category: 'etiquette',
    description: 'Understand the proper greetings and customs when visiting tribal villages in Jharkhand.',
    image: 'https://images.unsplash.com/photo-1609146708758-6d7f309d1388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    title: 'Dhuska and Pittha',
    category: 'food',
    description: 'Discover the traditional Jharkhand dishes Dhuska (fried bread) and Pittha (rice flour dumplings).',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    hasAR: true,
  },
  {
    id: 4,
    title: 'Sohrai Painting',
    category: 'art',
    description: 'Explore the traditional Sohrai painting style, characterized by geometric patterns and nature motifs.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasAR: true,
  },
  {
    id: 5,
    title: 'Karma Dance',
    category: 'traditions',
    description: 'Learn about the Karma dance, a traditional dance form performed during the Karma festival.',
    image: 'https://images.unsplash.com/photo-1545224144-b38cd309ef69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    hasVR: true,
  },
  {
    id: 6,
    title: 'Tusu Festival',
    category: 'festivals',
    description: 'Discover the Tusu festival celebrated during Makar Sankranti, featuring colorful decorations and folk songs.',
    image: 'https://images.unsplash.com/photo-1581260466152-d2c0303e52bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
  },
];

const vrExperiences: VRExperience[] = [
  {
    id: 1,
    title: 'Hundru Falls 360° Experience',
    location: 'Ranchi',
    description: 'Immerse yourself in the majestic Hundru Falls with this 360° virtual tour.',
    image: 'https://images.unsplash.com/photo-1623058324456-686d39200145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    vrLink: '#',
  },
  {
    id: 2,
    title: 'Tribal Village Walk',
    location: 'Khunti District',
    description: 'Take a virtual walk through a traditional tribal village and experience daily life.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1484&q=80',
    vrLink: '#',
  },
  {
    id: 3,
    title: 'Betla National Park Safari',
    location: 'Latehar',
    description: 'Experience a virtual safari through Betla National Park and spot wildlife in their natural habitat.',
    image: 'https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    vrLink: '#',
  },
  {
    id: 4,
    title: 'Netarhat Sunrise',
    location: 'Latehar',
    description: 'Witness the breathtaking sunrise at Netarhat, known as the "Queen of Chotanagpur".',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    vrLink: '#',
  },
];

const CulturalPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLesson, setSelectedLesson] = useState<CulturalLesson | null>(null);
  const [selectedVR, setSelectedVR] = useState<VRExperience | null>(null);
  const [activeTab, setActiveTab] = useState<'cultural' | 'vr'>('cultural');

  // Filter lessons based on category
  const filteredLessons = culturalLessons.filter((lesson) => {
    return selectedCategory === 'all' || lesson.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Cultural & AR/VR Experiences</h1>
          <p className="text-xl max-w-3xl">Immerse yourself in the rich cultural heritage of Jharkhand</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-8 relative z-20 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'cultural' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('cultural')}
            >
              <FaIcons.FaBook className="inline mr-2" /> Cultural Coach
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'vr' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('vr')}
            >
              <FaIcons.FaVrCardboard className="inline mr-2" /> AR/VR Experiences
            </button>
          </div>

          {activeTab === 'cultural' ? (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-md ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory('etiquette')}
                  className={`px-4 py-2 rounded-md ${selectedCategory === 'etiquette' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaIcons.FaInfoCircle className="inline mr-1" /> Etiquette
                </button>
                <button
                  onClick={() => setSelectedCategory('food')}
                  className={`px-4 py-2 rounded-md ${selectedCategory === 'food' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaIcons.FaUtensils className="inline mr-1" /> Food
                </button>
                <button
                  onClick={() => setSelectedCategory('festivals')}
                  className={`px-4 py-2 rounded-md ${selectedCategory === 'festivals' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaIcons.FaGlobe className="inline mr-1" /> Festivals
                </button>
                <button
                  onClick={() => setSelectedCategory('traditions')}
                  className={`px-4 py-2 rounded-md ${selectedCategory === 'traditions' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaIcons.FaMusic className="inline mr-1" /> Traditions
                </button>
                <button
                  onClick={() => setSelectedCategory('art')}
                  className={`px-4 py-2 rounded-md ${selectedCategory === 'art' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaIcons.FaPalette className="inline mr-1" /> Art
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                  <motion.div 
                    key={lesson.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={lesson.image} 
                        alt={lesson.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                        {lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1)}
                      </div>
                      {(lesson.hasAR || lesson.hasVR) && (
                        <div className="absolute bottom-0 left-0 bg-secondary text-white px-3 py-1 m-2 rounded-full text-sm font-medium flex items-center">
                          {lesson.hasAR && <span className="mr-2">AR</span>}
                          {lesson.hasVR && <FaIcons.FaVrCardboard className="mr-1" />}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{lesson.description}</p>
                      <button className="mt-3 text-primary font-medium hover:underline flex items-center">
                        Learn More <FaIcons.FaPlay className="ml-1 text-xs" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredLessons.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600">No cultural lessons found in this category</h3>
                  <p className="mt-2 text-gray-500">Try selecting a different category</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vrExperiences.map((experience) => (
                  <motion.div 
                    key={experience.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedVR(experience)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={experience.image} 
                        alt={experience.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <FaIcons.FaVrCardboard className="text-white text-5xl" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{experience.location}</p>
                      <p className="text-gray-700 mb-3">{experience.description}</p>
                      <button className="bg-secondary text-white px-4 py-2 rounded-md flex items-center justify-center w-full hover:bg-secondary-dark transition-colors">
                        <FaIcons.FaVrCardboard className="mr-2" /> Start VR Experience
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cultural Lesson Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedLesson.image} 
                alt={selectedLesson.title} 
                className="w-full h-64 md:h-80 object-cover"
              />
              <button 
                onClick={() => setSelectedLesson(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedLesson.category.charAt(0).toUpperCase() + selectedLesson.category.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{selectedLesson.title}</h2>
              <p className="text-gray-700 mb-6">{selectedLesson.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Did You Know?</h3>
                <p className="text-gray-700">
                  Additional interesting facts and information about {selectedLesson.title} would be displayed here, providing deeper cultural context and understanding.
                </p>
              </div>
              
              {selectedLesson.hasAR && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">AR Experience</h3>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FaIcons.FaVrCardboard className="text-4xl mx-auto mb-3 text-gray-500" />
                      <p className="text-gray-500">AR visualization would be displayed here</p>
                      <button className="mt-4 bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition-colors">
                        Launch AR Experience
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary text-white font-medium py-2 px-6 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center">
                  <FaIcons.FaBook className="mr-2" />
                  Learn More
                </button>
                
                {selectedLesson.hasVR && (
                  <button className="flex-1 border border-secondary text-secondary font-medium py-2 px-6 rounded-md hover:bg-secondary hover:text-white transition-colors flex items-center justify-center">
                    <FaIcons.FaVrCardboard className="mr-2" />
                    View in VR
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VR Experience Modal */}
      {selectedVR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="relative">
              <button 
                onClick={() => setSelectedVR(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Only VR preview, no extra buttons */}
              {selectedVR.title === 'Hundru Falls 360° Experience' ? (
                <StreetViewVR />
              ) : (
                <div className="bg-gray-200 h-96 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <FaIcons.FaVrCardboard className="text-6xl mx-auto mb-3 text-gray-500" />
                    <p className="text-gray-500">360° VR experience would be embedded here</p>
                    <p className="text-sm text-gray-400 mt-2">Use your mouse to look around or put on a VR headset for full immersion</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//const HUNDRU_COORDS = { lat: 28.6129, lng: 77.2295 };
const HUNDRU_COORDS = "F:-G4-iK7mQ6lE/AAAAAAAAAAAADAAAAAD-EACkAAAAADAAAAAAD-GACkAAAAAD-Iq0r5AAAAAD-GAoKAAAAAAAADAAAAA"
function StreetViewVR() {
  const streetViewRef = useRef(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyDuQKRddXVyEs3lzMj4wSFmZz_B1Vt7qwA',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const service = new window.google.maps.StreetViewService();
      
      // Use getPanoramaByLocation to find the nearest panorama
      // A larger radius (500) is used to ensure a hit
      (service as any).getPanoramaByLocation(
        HUNDRU_COORDS, 500, 
        (data: google.maps.StreetViewPanoramaData | null, status: google.maps.StreetViewStatus) => {
          setLoading(false);
          if (status === 'OK' && data && streetViewRef.current) {
            new window.google.maps.StreetViewPanorama(streetViewRef.current, {
              pano: data.location!.pano,
              pov: { heading: 165, pitch: 0 },
              zoom: 1,
              visible: true,
            });
          } else {
            setError(true);
          }
        }
      );
    }).catch(() => {
      setLoading(false);
      setError(true);
    });

  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 h-96 flex flex-col items-center justify-center rounded-t-lg">
        <FaIcons.FaSpinner className="text-4xl text-gray-400 mb-3 animate-spin" />
        <p className="text-gray-600 font-semibold">Loading VR preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 h-96 flex flex-col items-center justify-center rounded-t-lg">
        <FaIcons.FaExclamationCircle className="text-4xl text-gray-400 mb-3" />
        <p className="text-gray-600 font-semibold mb-2">VR preview not available for this location.</p>
        <p className="text-gray-500 text-sm">No Street View data found nearby.</p>
      </div>
    );
  }

  return (
    <div
      ref={streetViewRef}
      style={{ width: '100%', height: '400px', borderRadius: '0.75rem', overflow: 'hidden' }}
      className="rounded-t-lg"
    />
  );
}

export default CulturalPage;