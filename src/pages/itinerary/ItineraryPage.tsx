import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaDownload, FaGlobe } from 'react-icons/fa';
import { geminiService, ItineraryTable } from '../../services/geminiService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Web Speech API type declarations
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  itinerary?: ItineraryTable;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const ItineraryPage: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'sa', name: 'संस्कृत', flag: '🕉️' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const welcomeMessages: { [key: string]: string } = {
    'en': 'Hello! I\'m your AI travel planner. Tell me about your dream trip and I\'ll create a detailed itinerary for you.',
    'hi': 'नमस्ते! मैं आपका AI यात्रा योजनाकार हूं। अपनी सपनों की यात्रा के बारे में बताएं और मैं आपके लिए विस्तृत यात्रा कार्यक्रम बनाऊंगा।',
    'bn': 'হ্যালো! আমি আপনার AI ভ্রমণ পরিকল্পনাকারী। আপনার স্বপ্নের ভ্রমণ সম্পর্কে বলুন এবং আমি আপনার জন্য বিস্তারিত ভ্রমণসূচী তৈরি করব।',
    'sa': 'नमस्कारः! अहं भवतः AI यात्रा योजकः अस्मि। स्वप्नयात्रायाः विषये कथयतु, अहं भवतः कृते विस्तृतं यात्राक्रमं निर्मास्यामि।',
    'ja': 'こんにちは！私はあなたのAI旅行プランナーです。夢の旅行について教えてください。詳細な旅程を作成いたします。',
    'fr': 'Bonjour ! Je suis votre planificateur de voyage IA. Parlez-moi de votre voyage de rêve et je créerai un itinéraire détaillé pour vous.',
    'de': 'Hallo! Ich bin Ihr KI-Reiseplaner. Erzählen Sie mir von Ihrer Traumreise und ich erstelle einen detaillierten Reiseplan für Sie.',
    'es': '¡Hola! Soy tu planificador de viajes con IA. Cuéntame sobre tu viaje soñado y crearé un itinerario detallado para ti.'
  };

  const initializeSpeechServices = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = getLanguageCode(currentLanguage);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      setSpeechRecognition(recognition);
    }
    
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, [currentLanguage]);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: welcomeMessages[currentLanguage],
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    // Initialize speech services
    initializeSpeechServices();
  }, [currentLanguage, welcomeMessages, initializeSpeechServices]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLanguageCode = (lang: string): string => {
    const codes: { [key: string]: string } = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'sa': 'hi-IN', // Sanskrit uses Hindi recognition
      'ja': 'ja-JP',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'es': 'es-ES'
    };
    return codes[lang] || 'en-US';
  };

  const startListening = () => {
    if (speechRecognition && !isListening) {
      speechRecognition.lang = getLanguageCode(currentLanguage);
      speechRecognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (speechRecognition && isListening) {
      speechRecognition.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(currentLanguage);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: chatInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsGenerating(true);

    try {
      const response = await geminiService.generateItinerary(chatInput, currentLanguage);
      
      let botMessage: Message;
      
      if (typeof response === 'object' && response.planTable) {
        // Structured itinerary response
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Here\'s your personalized itinerary:',
          sender: 'bot',
          timestamp: new Date(),
          itinerary: response
        };
      } else {
        // Text response
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: typeof response === 'string' ? response : 'I\'ve created your itinerary!',
          sender: 'bot',
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while creating your itinerary. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    setShowLanguageSelector(false);
    geminiService.resetChat();
  };

  const downloadItineraryAsPDF = (itinerary: ItineraryTable) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Travel Itinerary', 20, 20);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Table data
    const tableData = itinerary.planTable.map(item => [
      item.day || '',
      item.date || '',
      item.time || '',
      item.activity || '',
      item.location || '',
      item.notes || ''
    ]);
    
    // Add table
    (doc as any).autoTable({
      head: [['Day', 'Date', 'Time', 'Activity', 'Location', 'Notes']],
      body: tableData,
      startY: 45,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] }
    });
    
    doc.save('travel-itinerary.pdf');
  };

  const renderMessage = (message: Message) => {
    if (message.itinerary) {
      return (
        <div>
          <p className="mb-4">{message.text}</p>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-primary text-white p-3 flex justify-between items-center">
              <h3 className="font-bold">Your Itinerary</h3>
              <button
                onClick={() => downloadItineraryAsPDF(message.itinerary!)}
                className="bg-white bg-opacity-20 p-1 rounded hover:bg-opacity-30 transition-colors"
                title="Download PDF"
              >
                <FaDownload size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {message.itinerary.planTable.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 text-sm font-medium text-gray-900">{item.day}</td>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.date}</td>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.time}</td>
                      <td className="px-3 py-2 text-sm text-gray-900">{item.activity}</td>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.location}</td>
                      <td className="px-3 py-2 text-sm text-gray-600">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    return <p>{message.text}</p>;
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
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">AI Itinerary Planner</h1>
          <p className="text-xl max-w-3xl">Create personalized travel itineraries with voice commands and multilingual support</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-8 relative z-20 mb-8">
          {/* Header with Language Selector */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center">
              <FaIcons.FaRobot className="text-primary mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">AI Travel Planner</h2>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaGlobe className="text-primary" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === currentLanguage)?.flag} {languages.find(lang => lang.code === currentLanguage)?.name}
                </span>
              </button>
              
              {showLanguageSelector && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-30 min-w-48">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${
                        currentLanguage === language.code ? 'bg-primary text-white hover:bg-primary-dark' : ''
                      }`}
                    >
                      <span>{language.flag}</span>
                      <span className="text-sm">{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="space-y-4">
            {/* Messages */}
            <div ref={messagesContainerRef} className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-4/5 rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none shadow-sm'}`}
                  >
                    <div className="flex items-start mb-1">
                      <span className="mr-2">
                        {message.sender === 'user' ? <FaIcons.FaUser size={14} /> : <FaIcons.FaRobot size={14} />}
                      </span>
                      <span className="font-medium text-sm">
                        {message.sender === 'user' ? 'You' : 'AI Planner'}
                      </span>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {renderMessage(message)}
                      </div>
                      {message.sender === 'bot' && speechSynthesis && message.text && (
                        <button
                          onClick={() => speakText(message.text!)}
                          className="ml-2 text-gray-500 hover:text-primary flex-shrink-0"
                          title="Read aloud"
                        >
                          <FaVolumeUp size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs opacity-70 text-right mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white text-gray-800 rounded-lg p-3 max-w-4/5 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <FaIcons.FaRobot size={14} />
                      <span className="font-medium text-sm">AI Planner</span>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={currentLanguage === 'en' ? "Describe your trip: '3 days in Goa, adventurous, low budget, family friendly'" : "अपनी यात्रा का वर्णन करें..."}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={chatInput}
                  onChange={handleInputChange}
                  disabled={isGenerating}
                />
                {speechRecognition && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                      isListening ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-primary'
                    }`}
                    title={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isListening ? <FaMicrophoneSlash size={16} /> : <FaMicrophone size={16} />}
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                disabled={isGenerating || !chatInput.trim()}
              >
                <FaIcons.FaPaperPlane className="mr-2" size={14} />
                {isGenerating ? 'Creating...' : 'Send'}
              </button>
            </form>
            
            <p className="text-xs text-gray-500 text-center">
              {currentLanguage === 'en' 
                ? 'Try: "3 day trip to Goa, adventurous, low budget, family friendly" or use voice input'
                : 'उदाहरण: "गोवा की 3 दिन की यात्रा, रोमांचक, कम बजट, पारिवारिक" या वॉयस इनपुट का उपयोग करें'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItineraryPage;
