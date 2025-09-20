import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotButton from '../chatbot/ChatbotButton';

interface LayoutProps {
  children: React.ReactNode;
  hideChatbot?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideChatbot = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      {!hideChatbot && <ChatbotButton />}
      <Footer />
    </div>
  );
};

export default Layout;