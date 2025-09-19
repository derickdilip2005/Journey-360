import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import * as FaIcons from 'react-icons/fa';
import { MdBusiness, MdAdminPanelSettings } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import the video
import landingVideo from '../../assets/LandingPage/landing-page.mp4';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'tourist',
      title: 'Tourist',
      subtitle: 'Explore India',
      icon: <FaUserTie className="text-4xl" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40'
    },
    {
      id: 'admin',
      title: 'Admin',
      subtitle: 'Manage Platform',
      icon: <MdAdminPanelSettings className="text-4xl" />,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40'
    },
    {
      id: 'businessman',
      title: 'Local Business',
      subtitle: 'Grow Your Business',
      icon: <MdBusiness className="text-4xl" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20 hover:border-green-500/40'
    },
    {
      id: 'guide',
      title: 'Guide',
      subtitle: 'Share Expertise',
      icon: <FaIcons.FaMapMarkedAlt className="text-4xl" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20 hover:border-orange-500/40'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    if (roleId === 'tourist') {
      // For tourists, go directly to the main tourism platform
      navigate('/home');
    } else {
      // For other roles, store selected role and go to login
      localStorage.setItem('selectedRole', roleId);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1
          }}
        >
          <source src={landingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 drop-shadow-2xl">
            Journey 360
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-4 max-w-4xl mx-auto drop-shadow-lg">
            Your Ultimate India Tourism Companion
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow-md">
            Choose your role to access personalized features
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => handleRoleSelect(role.id)}
            >
              <Card className={`${role.bgColor} ${role.borderColor} backdrop-blur-xl border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 group`}>
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {role.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {role.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-6">
                    {role.subtitle}
                  </p>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    Get Started
                    <FaIcons.FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-white/60 text-sm drop-shadow-md">
            Powered by AI • Trusted by thousands • Celebrating India's diversity
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;