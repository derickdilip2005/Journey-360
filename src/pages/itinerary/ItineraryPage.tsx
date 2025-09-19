import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { IoSend, IoMic, IoMicOff, IoLanguage, IoDownload } from 'react-icons/io5';
import { geminiService, ItineraryTable } from '../../services/geminiService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  itinerary?: ItineraryTable;
}

interface WelcomeMessages {
  [key: string]: string;
}

const ItineraryPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  ];

  const welcomeMessages: WelcomeMessages = {
    'en': 'Hello! I\'m your AI travel planner. Tell me about your dream trip and I\'ll create a detailed itinerary for you.',
    'hi': 'नमस्ते! मैं आपका AI यात्रा योजनाकार हूं। अपनी सपनों की यात्रा के बारे में बताएं और मैं आपके लिए एक विस्तृत यात्रा कार्यक्रम बनाऊंगा।',
    'bn': 'হ্যালো! আমি আপনার AI ভ্রমণ পরিকল্পনাকারী। আপনার স্বপ্নের ভ্রমণ সম্পর্কে বলুন এবং আমি আপনার জন্য একটি বিস্তারিত ভ্রমণসূচী তৈরি করব।',
    'te': 'హలో! నేను మీ AI ప్రయాణ ప్రణాళికాకర్త. మీ కలల యాత్ర గురించి చెప్పండి మరియు నేను మీ కోసం వివరణాత్మక ప్రయాణ కార్యక్రమం సృష్టిస్తాను।',
    'mr': 'नमस्कार! मी तुमचा AI प्रवास नियोजक आहे। तुमच्या स्वप्नातील प्रवासाबद्दल सांगा आणि मी तुमच्यासाठी तपशीलवार प्रवास कार्यक्रम तयार करेन।',
    'ta': 'வணக்கம்! நான் உங்கள் AI பயண திட்டமிடுபவர். உங்கள் கனவு பயணத்தைப் பற்றி சொல்லுங்கள், நான் உங்களுக்காக விரிவான பயண அட்டவணையை உருவாக்குவேன்.',
    'gu': 'નમસ્તે! હું તમારો AI પ્રવાસ આયોજક છું। તમારી સ્વપ્નની યાત્રા વિશે કહો અને હું તમારા માટે વિગતવાર પ્રવાસ કાર્યક્રમ બનાવીશ।',
    'kn': 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಪ್ರಯಾಣ ಯೋಜಕ. ನಿಮ್ಮ ಕನಸಿನ ಪ್ರಯಾಣದ ಬಗ್ಗೆ ಹೇಳಿ ಮತ್ತು ನಾನು ನಿಮಗಾಗಿ ವಿವರವಾದ ಪ್ರಯಾಣ ಕಾರ್ಯಕ್ರಮವನ್ನು ರಚಿಸುತ್ತೇನೆ.'
  };

  const initializeSpeechServices = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = getLanguageCode(currentLanguage);

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  };

  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      text: welcomeMessages[currentLanguage],
      isUser: false,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    initializeSpeechServices();
  }, [currentLanguage, welcomeMessages]);

  useEffect(() => {
    // Only scroll to bottom when a new message is added, not on initial load
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only handle clicks for language selector when it's open
      if (!showLanguageSelector) return;
      
      const target = event.target as Element;
      const languageSelector = document.querySelector('[data-language-selector]');
      
      // If clicking inside the language selector, don't close it
      if (languageSelector && languageSelector.contains(target)) {
        return;
      }
      
      // Close the language selector
      setShowLanguageSelector(false);
    };

    if (showLanguageSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageSelector]);

  const getLanguageCode = (lang: string): string => {
    const langMap: { [key: string]: string } = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'te': 'te-IN',
      'mr': 'mr-IN',
      'ta': 'ta-IN',
      'gu': 'gu-IN',
      'kn': 'kn-IN'
    };
    return langMap[lang] || 'en-US';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: chatInput,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await geminiService.generateItinerary(chatInput, currentLanguage);
      
      let botMessage: Message;
      
      if (typeof response === 'object' && response.planTable) {
        // Structured itinerary response
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Here\'s your personalized itinerary:',
          isUser: false,
          timestamp: new Date(),
          itinerary: response
        };
      } else {
        // Text response
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: typeof response === 'string' ? response : 'I\'ve created your itinerary!',
          isUser: false,
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, botMessage]);
      
      // Text-to-speech for bot response
      if (synthRef.current && botMessage.text) {
        const utterance = new SpeechSynthesisUtterance(botMessage.text);
        utterance.lang = getLanguageCode(currentLanguage);
        synthRef.current.speak(utterance);
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while creating your itinerary. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const downloadItineraryAsPDF = (itinerary: ItineraryTable) => {
    const doc = new jsPDF();
    
    // Add header with Journey 360 branding
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Add logo/title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Journey 360', 20, 20);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Travel Itinerary', 20, 30);
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // Add generation info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 55);
    doc.text(`Language: ${languages.find(lang => lang.code === currentLanguage)?.name || 'English'}`, 20, 65);
    
    // Add trip summary if available
    const totalDays = Array.from(new Set(itinerary.planTable.map(item => item.day))).length;
    const locations = Array.from(new Set(itinerary.planTable.map(item => item.location)));
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Trip Summary:', 20, 80);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Duration: ${totalDays} day${totalDays > 1 ? 's' : ''}`, 20, 90);
    doc.text(`Destinations: ${locations.join(', ')}`, 20, 100);
    
    // Calculate total estimated cost
    const totalCost = itinerary.planTable
      .map(item => item.cost || '0')
      .reduce((sum, cost) => {
        const numericCost = parseFloat(cost.replace(/[^\d.]/g, '')) || 0;
        return sum + numericCost;
      }, 0);
    
    if (totalCost > 0) {
      doc.text(`Estimated Total Cost: ₹${totalCost.toLocaleString()}`, 20, 110);
    }
    
    // Prepare table data with better formatting
    const tableData = itinerary.planTable.map(item => [
      item.day,
      item.time,
      item.activity.length > 30 ? item.activity.substring(0, 30) + '...' : item.activity,
      item.location,
      item.cost || 'Free',
      item.notes ? (item.notes.length > 40 ? item.notes.substring(0, 40) + '...' : item.notes) : '-'
    ]);
    
    // Add detailed itinerary table
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Itinerary:', 20, 125);
    
    (doc as any).autoTable({
      head: [['Day', 'Time', 'Activity', 'Location', 'Cost', 'Notes']],
      body: tableData,
      startY: 135,
      styles: { 
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak',
        halign: 'left'
      },
      headStyles: { 
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Day
        1: { cellWidth: 25 }, // Time
        2: { cellWidth: 50 }, // Activity
        3: { cellWidth: 35 }, // Location
        4: { cellWidth: 25 }, // Cost
        5: { cellWidth: 50 }  // Notes
      },
      margin: { left: 10, right: 10 }
    });
    
    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Generated by Journey 360 - Your Ultimate India Tourism Companion', 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }
    
    // Generate filename with date and location
    const mainLocation = locations[0] || 'India';
    const filename = `Journey360_Itinerary_${mainLocation.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    doc.save(filename);
  };

  const renderMessage = (message: Message) => {
    if (message.itinerary) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Your Itinerary</h3>
            <button
              onClick={() => downloadItineraryAsPDF(message.itinerary!)}
              className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors"
            >
              <IoDownload />
              Download PDF
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-300 px-4 py-2">Day</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                  <th className="border border-gray-300 px-4 py-2">Activity</th>
                  <th className="border border-gray-300 px-4 py-2">Location</th>
                  <th className="border border-gray-300 px-4 py-2">Cost</th>
                  <th className="border border-gray-300 px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {message.itinerary.planTable.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-300 px-4 py-2 font-medium">{item.day}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.time}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.activity}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.location}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.cost || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.notes || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return <p>{message.text}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-tertiary">
      {/* Hero Section */}
      <div className="relative py-20 text-center text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Language Selector */}
          <div className="absolute top-0 right-0">
            <div className="relative" data-language-selector>
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <IoLanguage />
                {languages.find(lang => lang.code === currentLanguage)?.flag}
                {languages.find(lang => lang.code === currentLanguage)?.name}
              </button>
              
              {showLanguageSelector && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg z-10 min-w-48">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setShowLanguageSelector(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-800 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaIcons.FaMapMarkedAlt className="text-6xl mb-6 mx-auto" />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">AI Itinerary Planner</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Plan your perfect trip with our AI-powered assistant. Get personalized itineraries, budget estimates, and travel recommendations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-primary text-white p-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaIcons.FaRobot />
                Travel Planning Assistant
              </h2>
              <p className="text-primary-light">Tell me about your trip preferences and I'll create your itinerary</p>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {renderMessage(message)}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      Creating your itinerary...
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Describe your trip (e.g., '5 days in Goa, budget ₹30,000, beaches and nightlife')"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  disabled={isLoading}
                >
                  {isListening ? <IoMicOff /> : <IoMic />}
                </button>
                
                <button
                  onClick={handleSendMessage}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  disabled={isLoading || !chatInput.trim()}
                >
                  <IoSend />
                </button>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                💡 Try: "Plan a 3-day trip to Kerala with ₹25,000 budget focusing on backwaters and culture"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;