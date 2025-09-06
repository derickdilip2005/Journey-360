import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaGlobeAsia, FaUser, FaSpinner } from 'react-icons/fa';
import { geminiService } from '../../services/geminiService';

// Types
type Language = 'en' | 'hi' | 'bn' | 'sa' | 'ja' | 'fr' | 'de' | 'es';

interface Message {
  id: string;
  text: string;
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
  const welcomeMessages: Record<Language, string> = {
    en: 'Hello! I am your Journey 360 assistant. How can I help you today?',
    hi: 'नमस्ते! मैं आपका भारत पर्यटन सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    bn: 'হ্যালো! আমি আপনার ভারত পর্যটন সহকারী। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    sa: 'नमस्ते! अहं भवतः भारत-पर्यटन-सहायकः अस्मि। अद्य अहं भवतः कथं साहाय्यं कर्तुं शक्नोमि?',
    ja: 'こんにちは！私はインド観光アシスタントです。今日はどのようにお手伝いできますか？',
    fr: 'Bonjour! Je suis votre assistant touristique de l\'Inde. Comment puis-je vous aider aujourd\'hui?',
    de: 'Hallo! Ich bin Ihr Indien-Tourismus-Assistent. Wie kann ich Ihnen heute helfen?',
    es: '¡Hola! Soy su asistente de turismo de India. ¿Cómo puedo ayudarle hoy?',
  };

  // Add welcome message when language changes
  useEffect(() => {
    if (messages.length === 0 || messages[messages.length - 1].sender !== 'bot') {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: welcomeMessages[currentLanguage],
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
  }, [currentLanguage]);

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
      // Get response from Gemini API
      const botResponse = await geminiService.sendMessage(userMessageText, currentLanguage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
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
                    <p>{message.text}</p>
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
                  ? 'You can type in any language. Our assistant will try to understand and respond accordingly.'
                  : 'You can type in any language. Our assistant will try to understand and respond accordingly.'}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MultilingualChatbot;