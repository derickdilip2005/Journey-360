import React, { useState } from 'react';
import { XMarkIcon as XIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import * as FaIcons from 'react-icons/fa';

interface ChatbotWindowProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your Jharkhand Tourism assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('english');

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      let botResponse = '';
      
      if (input.toLowerCase().includes('plan')) {
        botResponse = 'I can help you plan your trip to Jharkhand! Would you like to explore waterfalls, tribal culture, wildlife, or historical sites?';
      } else if (input.toLowerCase().includes('hotel') || input.toLowerCase().includes('stay')) {
        botResponse = 'Jharkhand offers various accommodation options from luxury hotels to eco-resorts. Which city are you planning to stay in?';
      } else if (input.toLowerCase().includes('food') || input.toLowerCase().includes('cuisine')) {
        botResponse = 'Jharkhand cuisine is known for dishes like Dhuska, Pittha, and Handia. Would you like to know more about local food specialties?';
      } else {
        botResponse = 'Thank you for your message. How else can I assist you with your Jharkhand travel plans?';
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    // In a real app, this would change the language of the chatbot responses
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">Jharkhand Tourism Assistant</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <XIcon className="h-5 w-5" />
        </button>
      </div>
      
      {/* Language selector */}
      <div className="bg-gray-100 px-4 py-2 flex space-x-2 text-sm">
        <button 
          onClick={() => changeLanguage('english')} 
          className={`px-2 py-1 rounded ${language === 'english' ? 'bg-primary text-white' : 'bg-white'}`}
        >
          English
        </button>
        <button 
          onClick={() => changeLanguage('hindi')} 
          className={`px-2 py-1 rounded ${language === 'hindi' ? 'bg-primary text-white' : 'bg-white'}`}
        >
          हिंदी
        </button>
        <button 
          onClick={() => changeLanguage('bengali')} 
          className={`px-2 py-1 rounded ${language === 'bengali' ? 'bg-primary text-white' : 'bg-white'}`}
        >
          বাংলা
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3/4 rounded-lg px-4 py-2 ${message.sender === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-white border border-gray-200 rounded-tl-none'}`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'bot' ? (
                  <FaIcons.FaRobot className="mr-2 h-4 w-4" />
                ) : (
                  <FaIcons.FaUser className="mr-2 h-4 w-4" />
                )}
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="bg-primary text-white rounded-r-lg px-4 py-2 hover:bg-primary-dark transition-colors"
          >
            <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWindow;