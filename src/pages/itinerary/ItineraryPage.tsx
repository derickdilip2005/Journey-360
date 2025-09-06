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
  const [activeTab, setActiveTab] = useState<'chatbot'>('chatbot');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  


  // Sample itinerary data (would come from backend in real app)
  const sampleItinerary: GeneratedItinerary = {
    title: "Weekend Getaway in Delhi",
    days: [
      {
        day: 1,
        activities: [
          {
            time: "08:00 AM",
            activity: "Breakfast",
            location: "Cafe Lota, Delhi",
            description: "Start your day with a traditional Indian breakfast.",
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666"
          },
          {
            time: "10:00 AM",
            activity: "Visit Red Fort",
            location: "Red Fort, Old Delhi",
            description: "Explore this UNESCO World Heritage site and symbol of India's rich history.",
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
            activity: "Visit India Gate",
            location: "Rajpath, New Delhi",
            description: "Visit this iconic war memorial and one of Delhi's most famous landmarks.",
            image: "https://images.unsplash.com/photo-1518890569493-668df9a00266"
          },
          {
            time: "12:00 PM",
            activity: "Lunch",
            location: "Chandni Chowk, Old Delhi",
            description: "Try authentic Delhi street food at this historic market area.",
            image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb"
          },
          {
            time: "02:00 PM",
            activity: "Lotus Temple",
            location: "Kalkaji, New Delhi",
            description: "Visit this architectural marvel known for its flower-like shape and peaceful atmosphere.",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"
          },
          {
            time: "04:30 PM",
            activity: "Shopping at Connaught Place",
            location: "Connaught Place, New Delhi",
            description: "Shop for handicrafts, textiles, and souvenirs at this iconic shopping destination.",
            image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d"
          },
          {
            time: "07:00 PM",
            activity: "Cultural Performance",
            location: "Kingdom of Dreams, Gurgaon",
            description: "Experience traditional Indian dance and music performances showcasing diverse cultures.",
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
          <p className="text-xl max-w-3xl">Create a personalized itinerary for your India adventure</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-8 relative z-20 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className="py-2 px-4 font-medium text-primary border-b-2 border-primary"
            >
              <FaIcons.FaRobot className="inline mr-2" /> AI Chatbot Planner
            </button>
          </div>

          <div className="mt-6">
            <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <FaIcons.FaRobot className="text-4xl mx-auto mb-3 text-primary" />
                      <p className="font-medium">Chat with our AI to create your perfect itinerary</p>
                      <p className="text-sm mt-2">Try saying:</p>
                      <div className="mt-3 space-y-2">
                        <p className="bg-gray-100 p-2 rounded-lg inline-block text-sm">"Plan a 2-day trip to Delhi with historical sites and markets"</p>
                        <p className="bg-gray-100 p-2 rounded-lg inline-block text-sm">"Weekend getaway in Rajasthan with cultural experiences"</p>
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
                    placeholder="Describe your ideal trip (e.g., '3 days in Delhi with family')..."
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