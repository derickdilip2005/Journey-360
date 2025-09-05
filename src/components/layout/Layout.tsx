import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotButton from '../chatbot/ChatbotButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <ChatbotButton />
      <Footer />
    </div>
  );
};

export default Layout;