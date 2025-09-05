import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

// Types
interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    activity: string;
    location: string;
    description: string;
    image?: string;
  }[];
}

interface GeneratedItinerary {
  title: string;
  days: ItineraryDay[];
  budget: string;
  travelMode: string;
}

const ItineraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'manual'>('chatbot');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  
  // Form state for manual itinerary creation
  const [manualForm, setManualForm] = useState({
    duration: '2',
    budget: 'medium',
    interests: [] as string[],
    startLocation: '',
    travelMode: 'public',
  });

  // Sample itinerary data (would come from backend in real app)
  const sampleItinerary: GeneratedItinerary = {
    title: "Weekend Getaway in Ranchi",
    days: [
      {
        day: 1,
        activities: [
          {
            time: "08:00 AM",
            activity: "Breakfast",
            location: "Cafe Nirvana, Ranchi",
            description: "Start your day with a traditional Jharkhand breakfast.",
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666"
          },
          {
            time: "10:00 AM",
            activity: "Visit Hundru Falls",
            location: "Hundru Falls, 45km from Ranchi",
            description: "Explore one of the highest waterfalls in Jharkhand with a 98-meter drop.",
            image: "https://images.unsplash.com/photo-1623058324456-686d39200145"
          },
          {
            time: "01:00 PM",
            activity: "Lunch",
            location: "Local restaurant near Hundru Falls",
            description: "Enjoy local Jharkhand cuisine with specialties like Dhuska and Pittha.",
            image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84"
          },
          {
            time: "03:00 PM",
            activity: "Visit Tribal Research Institute Museum",
            location: "Morabadi, Ranchi",
            description: "Learn about the rich tribal heritage and culture of Jharkhand.",
            image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69"
          },
          {
            time: "06:00 PM",
            activity: "Evening at Pahari Mandir",
            location: "Ranchi Hill, Ranchi",
            description: "Visit this hilltop temple for panoramic views of Ranchi city at sunset.",
            image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5"
          },
          {
            time: "08:00 PM",
            activity: "Dinner",
            location: "The Urban Spice, Ranchi",
            description: "End your day with a delightful dinner at one of Ranchi's popular restaurants.",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            time: "08:00 AM",
            activity: "Breakfast",
            location: "Hotel/Accommodation",
            description: "Start your day with a hearty breakfast.",
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666"
          },
          {
            time: "09:30 AM",
            activity: "Visit Tagore Hill",
            location: "Morabadi, Ranchi",
            description: "Explore this historical site where Rabindranath Tagore wrote some of his works.",
            image: "https://images.unsplash.com/photo-1518890569493-668df9a00266"
          },
          {
            time: "12:00 PM",
            activity: "Lunch",
            location: "Firayalal Market Area",
            description: "Try local street food at this bustling market area.",
            image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb"
          },
          {
            time: "02:00 PM",
            activity: "Rock Garden",
            location: "Kanke Road, Ranchi",
            description: "Visit this beautiful garden made from waste materials with waterfalls and sculptures.",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"
          },
          {
            time: "04:30 PM",
            activity: "Shopping at Tribal Handicraft Market",
            location: "Main Road, Ranchi",
            description: "Buy authentic tribal handicrafts, jewelry, and souvenirs.",
            image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d"
          },
          {
            time: "07:00 PM",
            activity: "Cultural Performance",
            location: "Tribal Cultural Center, Ranchi",
            description: "Experience traditional Jharkhand dance and music performances.",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"
          }
        ]
      }
    ],
    budget: "₹5,000 - ₹7,000 per person",
    travelMode: "Local transport and taxis"
  };

  // Handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message to chat
    const newMessage = { text: chatInput, sender: 'user' as const };
    setChatMessages([...chatMessages, newMessage]);
    setChatInput('');

    // Simulate bot thinking
    setIsGenerating(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      // Add bot response
      const botResponse = { 
        text: "I'll create an itinerary based on your request. Give me a moment...", 
        sender: 'bot' as const 
      };
      setChatMessages(prev => [...prev, botResponse]);
      
      // Simulate generating itinerary after another delay
      setTimeout(() => {
        setGeneratedItinerary(sampleItinerary);
        setIsGenerating(false);
      }, 2000);
    }, 1000);
  };

  // Handle manual form submission
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate generating itinerary after delay
    setTimeout(() => {
      setGeneratedItinerary(sampleItinerary);
      setIsGenerating(false);
    }, 2000);
  };

  // Handle interest selection in manual form
  const toggleInterest = (interest: string) => {
    setManualForm(prev => {
      const interests = [...prev.interests];
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Plan Your Perfect Trip</h1>
          <p className="text-xl max-w-3xl">Create a personalized itinerary for your Jharkhand adventure</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-8 relative z-20 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'chatbot' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('chatbot')}
            >
              <FaIcons.FaRobot className="inline mr-2" /> AI Chatbot Planner
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'manual' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('manual')}
            >
              <FaIcons.FaUser className="inline mr-2" /> Manual Planner
            </button>
          </div>

          <div className="mt-6">
            {activeTab === 'chatbot' ? (
              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <FaIcons.FaRobot className="text-4xl mx-auto mb-3 text-primary" />
                      <p className="font-medium">Chat with our AI to create your perfect itinerary</p>
                      <p className="text-sm mt-2">Try saying:</p>
                      <div className="mt-3 space-y-2">
                        <p className="bg-gray-100 p-2 rounded-lg inline-block text-sm">"Plan a 2-day trip to Ranchi with waterfalls and tribal markets"</p>
                        <p className="bg-gray-100 p-2 rounded-lg inline-block text-sm">"Weekend getaway in Jharkhand with adventure activities"</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((message, index) => (
                        <div 
                          key={index} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-3/4 rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                          >
                            {message.text}
                          </div>
                        </div>
                      ))}
                      {isGenerating && (
                        <div className="flex justify-start">
                          <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-3/4">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Describe your ideal trip (e.g., '3 days in Ranchi with family')..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    disabled={isGenerating}
                  >
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Trip Duration (Days)</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={manualForm.duration}
                      onChange={(e) => setManualForm({...manualForm, duration: e.target.value})}
                    >
                      <option value="1">1 Day</option>
                      <option value="2">2 Days</option>
                      <option value="3">3 Days</option>
                      <option value="4">4 Days</option>
                      <option value="5">5 Days</option>
                      <option value="7">1 Week</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Budget</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={manualForm.budget}
                      onChange={(e) => setManualForm({...manualForm, budget: e.target.value})}
                    >
                      <option value="budget">Budget Friendly</option>
                      <option value="medium">Medium Range</option>
                      <option value="luxury">Luxury Experience</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Starting Location</label>
                  <input
                    type="text"
                    placeholder="Where will you start your journey from?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={manualForm.startLocation}
                    onChange={(e) => setManualForm({...manualForm, startLocation: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {['Nature', 'Adventure', 'Heritage', 'Spiritual', 'Food', 'Culture', 'Wildlife', 'Photography'].map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        className={`px-4 py-2 rounded-md ${manualForm.interests.includes(interest) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Preferred Travel Mode</label>
                  <div className="flex flex-wrap gap-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="travelMode"
                        value="public"
                        checked={manualForm.travelMode === 'public'}
                        onChange={() => setManualForm({...manualForm, travelMode: 'public'})}
                      />
                      <span className="ml-2">Public Transport</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="travelMode"
                        value="private"
                        checked={manualForm.travelMode === 'private'}
                        onChange={() => setManualForm({...manualForm, travelMode: 'private'})}
                      />
                      <span className="ml-2">Private Vehicle</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio text-primary"
                        name="travelMode"
                        value="taxi"
                        checked={manualForm.travelMode === 'taxi'}
                        onChange={() => setManualForm({...manualForm, travelMode: 'taxi'})}
                      />
                      <span className="ml-2">Taxi/Cab</span>
                    </label>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors font-medium"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating Itinerary...' : 'Generate Itinerary'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Generated Itinerary */}
        {generatedItinerary && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
          >
            <div className="bg-primary text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{generatedItinerary.title}</h2>
                <div className="flex space-x-2">
                  <button className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors">
                    <FaIcons.FaDownload className="text-white" />
                  </button>
                  <button className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors">
                    <FaIcons.FaShare className="text-white" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <div className="flex items-center">
                  <FaIcons.FaCalendarAlt className="mr-2" />
                  <span>{generatedItinerary.days.length} Days</span>
                </div>
                <div className="flex items-center">
                  <FaIcons.FaWallet className="mr-2" />
                  <span>{generatedItinerary.budget}</span>
                </div>
                <div className="flex items-center">
                  <FaIcons.FaMapMarkerAlt className="mr-2" />
                  <span>{generatedItinerary.travelMode}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {generatedItinerary.days.map((day) => (
                <div key={day.day} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                    Day {day.day}
                  </h3>
                  <div className="space-y-6">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="flex">
                        <div className="w-24 flex-shrink-0 text-right pr-4">
                          <div className="font-medium text-primary">{activity.time}</div>
                        </div>
                        <div className="relative pl-6 border-l-2 border-gray-200 pb-6 last:border-transparent last:pb-0">
                          <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-bold text-lg">{activity.activity}</h4>
                            <div className="flex items-center text-gray-600 text-sm mb-2">
                              <FaIcons.FaMapMarkerAlt className="mr-1" />
                              <span>{activity.location}</span>
                            </div>
                            <p className="text-gray-700 mb-3">{activity.description}</p>
                            {activity.image && (
                              <img 
                                src={activity.image} 
                                alt={activity.activity} 
                                className="w-full h-40 object-cover rounded-md"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <h3 className="text-lg font-bold mb-4">Trip Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center text-primary mb-2">
                    <FaIcons.FaCalendarAlt className="mr-2" />
                    <h4 className="font-medium">Duration</h4>
                  </div>
                  <p>{generatedItinerary.days.length} Days</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center text-primary mb-2">
                    <FaIcons.FaWallet className="mr-2" />
                    <h4 className="font-medium">Estimated Budget</h4>
                  </div>
                  <p>{generatedItinerary.budget}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center text-primary mb-2">
                    <FaIcons.FaHiking className="mr-2" />
                    <h4 className="font-medium">Activities</h4>
                  </div>
                  <p>Nature, Culture, Sightseeing</p>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex-1 bg-primary text-white font-medium py-2 px-6 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center">
                  <FaIcons.FaDownload className="mr-2" />
                  Download as PDF
                </button>
                <button className="flex-1 border border-primary text-primary font-medium py-2 px-6 rounded-md hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
                  <FaIcons.FaShare className="mr-2" />
                  Share Itinerary
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default ItineraryPage;