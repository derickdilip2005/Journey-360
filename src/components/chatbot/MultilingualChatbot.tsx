import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaGlobeAsia, FaUser, FaSpinner, FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaMapMarkerAlt, FaDirections } from 'react-icons/fa';
import { chatbotService, ChatbotResponse } from '../../services/chatbotService';
import { LocationPlace } from '../../services/locationService';

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Types
type Language = 'en' | 'hi' | 'bn' | 'sa' | 'ja' | 'fr' | 'de' | 'es';

interface Message {
  id: string;
  text?: string;
  structured?: any;
  places?: LocationPlace[];
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

const MultilingualChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState<boolean>(false);
  const [locationPermission, setLocationPermission] = useState<string>('prompt');

  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Language options
  const languages: LanguageOption[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
  ];

  // Welcome messages in different languages
  const welcomeMessages: Record<Language, string> = useMemo(() => ({
    en: 'Hello! I am your Journey 360 assistant. How can I help you today?',
    hi: 'नमस्ते! मैं आपका भारत पर्यटन सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    bn: 'হ্যালো! আমি আপনার ভারত পর্যটন সহকারী। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    sa: 'नमस्ते! अहं भवतः भारत-पर्यटन-सहायकः अस्मि। अद्य अहं भवतः कथं साहाय्यं कर्तुं शक्नोमि?',
    ja: 'こんにちは！私はインド観光アシスタントです。今日はどのようにお手伝いできますか？',
    fr: 'Bonjour! Je suis votre assistant touristique de l\'Inde. Comment puis-je vous aider aujourd\'hui?',
    de: 'Hallo! Ich bin Ihr Indien-Tourismus-Assistent. Wie kann ich Ihnen heute helfen?',
    es: '¡Hola! Soy su asistente de turismo de India. ¿Cómo puedo ayudarle hoy?',
  }), []);

  const initializeSpeechServices = useCallback(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = getLanguageCode(currentLanguage);
        
        recognition.onstart = () => {
          setIsListening(true);
        };
        
        recognition.onresult = (event: any) => {
          if (event.results && event.results[0] && event.results[0][0]) {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
          }
          setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        setSpeechRecognition(recognition);
      } catch (error) {
        console.error('Failed to initialize speech recognition:', error);
      }
    }
    
    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, [currentLanguage]);

  // Add welcome message when language changes
  useEffect(() => {
    // Add welcome message when language changes
    if (messages.length === 0 || messages[messages.length - 1].sender !== 'bot') {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: welcomeMessages[currentLanguage],
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
    
    // Initialize speech recognition and synthesis
    initializeSpeechServices();
  }, [currentLanguage, welcomeMessages, initializeSpeechServices]);

  const getLanguageCode = (lang: string): string => {
    const languageCodes: { [key: string]: string } = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'sa': 'sa-IN',
      'ja': 'ja-JP',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'es': 'es-ES',
      'ta': 'ta-IN',
      'gu': 'gu-IN',
      'kn': 'kn-IN',
      'mr': 'mr-IN'
    };
    return languageCodes[lang] || 'en-US';
  };

  const startListening = () => {
    if (speechRecognition && !isListening) {
      speechRecognition.lang = getLanguageCode(currentLanguage);
      speechRecognition.start();
    }
  };

  const stopListening = () => {
    if (speechRecognition && isListening) {
      speechRecognition.stop();
    }
  };

  const speakText = (text: string) => {
    if (speechSynthesis) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(currentLanguage);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      // Try to find a voice for the current language
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => voice.lang.startsWith(getLanguageCode(currentLanguage).split('-')[0]));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: welcomeMessages[currentLanguage],
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessageText = inputValue;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Get response from enhanced chatbot service
      const botResponse: ChatbotResponse = await chatbotService.sendMessage(
        userMessageText, 
        currentLanguage
      );
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        structured: botResponse.structured,
        places: botResponse.places,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      // Fallback message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m having trouble responding right now. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setShowLanguageSelector(false);
    chatbotService.resetChat();
  };

  const handleLocationClick = (place: LocationPlace) => {
    const directionsUrl = chatbotService.getDirectionsUrl(place);
    window.open(directionsUrl, '_blank');
  };

  const requestLocationPermission = async () => {
    try {
      await chatbotService.getUserLocation();
      setLocationPermission('granted');
    } catch (error) {
      setLocationPermission('denied');
      console.error('Location permission denied:', error);
    }
  };

  const renderMessage = (message: Message) => {
    if (message.structured && message.places) {
      return (
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">{message.structured.title}</h4>
          <div className="space-y-2">
            {message.structured.items.map((item: any, index: number) => {
              const place = message.places![index];
              return (
                <div key={index} className="bg-white bg-opacity-50 rounded p-2 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div dangerouslySetInnerHTML={{ __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <button
                        onClick={() => handleLocationClick(place)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Get directions"
                      >
                        <FaDirections size={12} />
                      </button>
                      <FaMapMarkerAlt className="text-red-500" size={12} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    
    return <p>{message.text}</p>;
  };





  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" size={20} />
                <h3 className="font-bold">Journey 360 Assistant</h3>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => setShowLanguageSelector(prev => !prev)}
                  className="text-white hover:text-gray-200 mr-2"
                  title="Change language"
                >
                  <FaGlobeAsia size={18} />
                </button>
                <button 
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200"
                  title="Close chat"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>

            {/* Language selector dropdown */}
            <AnimatePresence>
              {showLanguageSelector && (
                <motion.div 
                  className="absolute top-14 right-0 bg-white shadow-md rounded-bl-lg overflow-hidden z-10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="max-h-60 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${currentLanguage === lang.code ? 'bg-primary bg-opacity-10 text-primary font-medium' : ''}`}
                        onClick={() => handleLanguageChange(lang.code)}
                      >
                        <span>{lang.name}</span>
                        <span className="text-sm text-gray-500">{lang.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96">
              {locationPermission === 'prompt' && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">Enable location for nearby places</span>
                    </div>
                    <button
                      onClick={requestLocationPermission}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Allow
                    </button>
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3/4 rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}
                  >
                    <div className="flex items-start mb-1">
                      <span className="mr-2">
                        {message.sender === 'user' ? <FaUser size={14} /> : <FaRobot size={14} />}
                      </span>
                      <span className="font-medium">
                        {message.sender === 'user' ? 'You' : 'Assistant'}
                      </span>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {renderMessage(message)}
                      </div>
                      {message.sender === 'bot' && speechSynthesis && message.text && (
                        <button
                          onClick={() => speakText(message.text!)}
                          className="ml-2 text-gray-500 hover:text-blue-600 flex-shrink-0"
                          title="Read aloud"
                        >
                          <FaVolumeUp size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs opacity-70 text-right mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none p-3">
                    <div className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      <span>Typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
              <div className="flex">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={currentLanguage === 'en' ? 'Type your message...' : 'Type your message (in any language)...'}
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {speechRecognition && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`px-3 py-2 border-t border-b border-gray-300 ${isListening ? 'bg-red-100 text-red-600' : 'bg-gray-50 text-gray-600'} hover:bg-gray-100 flex items-center`}
                    title={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors"
                  disabled={inputValue.trim() === ''}
                >
                  <FaPaperPlane />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {currentLanguage === 'en' 
                  ? 'Ask about nearby places: "Find ATMs", "Show restaurants", "Petrol pumps near me"'
                  : 'Ask about nearby places or type in any language for travel assistance.'}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MultilingualChatbot;