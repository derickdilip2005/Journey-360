import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaAmbulance, FaInfoCircle, FaPhone, FaExclamationTriangle,
  FaCompass, FaTemperatureHigh, FaMapMarkedAlt, FaWater, FaTree, FaMountain,
  FaChevronUp, FaChevronDown, FaSearch
} from 'react-icons/fa';

// Define icon components
type IconProps = {
  className?: string;
};

// Create wrapper components for icons
const IconShieldAlt: React.FC<IconProps> = ({ className }) => (
  <>{<FaShieldAlt className={className} />}</>
);

const IconAmbulance: React.FC<IconProps> = ({ className }) => (
  <>{<FaAmbulance className={className} />}</>
);

const IconInfoCircle: React.FC<IconProps> = ({ className }) => (
  <>{<FaInfoCircle className={className} />}</>
);

const IconPhone: React.FC<IconProps> = ({ className }) => (
  <>{<FaPhone className={className} />}</>
);

const IconExclamationTriangle: React.FC<IconProps> = ({ className }) => (
  <>{<FaExclamationTriangle className={className} />}</>
);

const IconCompass: React.FC<IconProps> = ({ className }) => (
  <>{<FaCompass className={className} />}</>
);

const IconTemperatureHigh: React.FC<IconProps> = ({ className }) => (
  <>{<FaTemperatureHigh className={className} />}</>
);

const IconMapMarkedAlt: React.FC<IconProps> = ({ className }) => (
  <>{<FaMapMarkedAlt className={className} />}</>
);

const IconWater: React.FC<IconProps> = ({ className }) => (
  <>{<FaWater className={className} />}</>
);

const IconTree: React.FC<IconProps> = ({ className }) => (
  <>{<FaTree className={className} />}</>
);

const IconMountain: React.FC<IconProps> = ({ className }) => (
  <>{<FaMountain className={className} />}</>
);

const IconChevronUp: React.FC<IconProps> = ({ className }) => (
  <>{<FaChevronUp className={className} />}</>
);

const IconChevronDown: React.FC<IconProps> = ({ className }) => (
  <>{<FaChevronDown className={className} />}</>
);

const IconSearch: React.FC<IconProps> = ({ className }) => (
  <>{<FaSearch className={className} />}</>
);

// Types
interface EmergencyContact {
  id: number;
  name: string;
  number: string;
  description: string;
  icon: React.ReactElement;
}

interface SafetyTip {
  id: number;
  category: string;
  title: string;
  description: string;
  icon: React.ReactElement;
}

interface TravelAdvisory {
  id: number;
  title: string;
  level: 'low' | 'moderate' | 'high';
  description: string;
  date: string;
  areas: string[];
}

// Sample data
const emergencyContacts: EmergencyContact[] = [
  {
    id: 1,
    name: 'Police Emergency',
    number: '100',
    description: 'For any crime, security threat, or emergency situation',
    icon: <IconShieldAlt className="text-blue-600 text-2xl" />,
  },
  {
    id: 2,
    name: 'Medical Emergency',
    number: '108',
    description: 'For medical emergencies and ambulance services',
    icon: <IconAmbulance className="text-red-600 text-2xl" />,
  },
  {
    id: 3,
    name: 'Tourist Helpline',
    number: '1800-111-363',
    description: '24x7 multilingual tourist helpline for any assistance',
    icon: <IconInfoCircle className="text-green-600 text-2xl" />,
  },
  {
    id: 4,
    name: 'Women Helpline',
    number: '1091',
    description: 'For women in distress or facing harassment',
    icon: <IconPhone className="text-purple-600 text-2xl" />,
  },
  {
    id: 5,
    name: 'Disaster Management',
    number: '1070',
    description: 'For natural disasters and related emergencies',
    icon: <IconExclamationTriangle className="text-yellow-600 text-2xl" />,
  },
];

const safetyTips: SafetyTip[] = [
  {
    id: 1,
    category: 'Trekking & Hiking',
    title: 'Stay on marked trails',
    description: 'Always stick to designated paths and trails. Venturing off-trail can lead to getting lost, encountering dangerous wildlife, or damaging fragile ecosystems.',
    icon: <IconCompass className="text-green-600 text-2xl" />,
  },
  {
    id: 2,
    category: 'Trekking & Hiking',
    title: 'Check weather forecasts',
    description: 'Before heading out, always check the weather forecast. Conditions can change rapidly in hilly areas, especially during monsoon season.',
    icon: <IconTemperatureHigh className="text-orange-600 text-2xl" />,
  },
  {
    id: 3,
    category: 'Trekking & Hiking',
    title: 'Carry essential supplies',
    description: 'Always carry water, first-aid kit, map, compass, flashlight, and emergency food. A whistle can be useful for signaling in emergencies.',
    icon: <IconMapMarkedAlt className="text-blue-600 text-2xl" />,
  },
  {
    id: 4,
    category: 'Waterfall Safety',
    title: 'Avoid swimming during monsoons',
    description: 'Water levels can rise suddenly during the rainy season. Avoid swimming in waterfalls and rivers during monsoons.',
    icon: <IconWater className="text-blue-600 text-2xl" />,
  },
  {
    id: 5,
    category: 'Waterfall Safety',
    title: 'Check water depth before diving',
    description: 'Never dive into unknown waters. Rocks and shallow areas can cause serious injuries.',
    icon: <IconWater className="text-blue-600 text-2xl" />,
  },
  {
    id: 6,
    category: 'Forest & Wildlife',
    title: 'Maintain distance from wildlife',
    description: 'Never approach, feed, or disturb wild animals. Maintain a safe distance and use binoculars for viewing.',
    icon: <IconTree className="text-green-600 text-2xl" />,
  },
  {
    id: 7,
    category: 'Forest & Wildlife',
    title: 'Follow park regulations',
    description: 'Adhere to all rules and guidelines in national parks and wildlife sanctuaries. These are designed for your safety and wildlife protection.',
    icon: <IconTree className="text-green-600 text-2xl" />,
  },
  {
    id: 8,
    category: 'Mountain Safety',
    title: 'Acclimatize properly',
    description: 'When visiting higher elevations, take time to acclimatize to prevent altitude sickness. Ascend gradually and stay hydrated.',
    icon: <IconMountain className="text-gray-600 text-2xl" />,
  },
];

const travelAdvisories: TravelAdvisory[] = [
  {
    id: 1,
    title: 'Monsoon Travel Advisory',
    level: 'moderate',
    description: 'Heavy rainfall may cause landslides and flash floods in mountainous regions. Road conditions may deteriorate, and some trekking routes might be closed across the Western Ghats and Himalayan foothills.',
    date: 'June 15, 2023',
    areas: ['Western Ghats', 'Himalayan foothills', 'Hill stations', 'Coastal regions'],
  },
  {
    id: 2,
    title: 'Wildlife Movement Advisory',
    level: 'moderate',
    description: 'Increased wildlife movement reported in buffer zones around major national parks and tiger reserves across India. Visitors are advised to stay on designated paths and avoid dawn/dusk travel in these areas.',
    date: 'May 20, 2023',
    areas: ['Jim Corbett National Park', 'Ranthambore Tiger Reserve', 'Bandhavgarh National Park', 'Kaziranga National Park'],
  },
  {
    id: 3,
    title: 'High Altitude Travel Advisory',
    level: 'high',
    description: 'Travelers visiting high-altitude destinations should be aware of altitude sickness risks. Proper acclimatization and medical clearance recommended for areas above 3000m.',
    date: 'March 25, 2023',
    areas: ['Ladakh', 'Spiti Valley', 'Manali-Leh Highway', 'High-altitude trekking routes'],
  },
  {
    id: 4,
    title: 'Remote Areas Connectivity',
    level: 'low',
    description: 'Some remote areas across India have limited mobile connectivity. Travelers planning to visit isolated regions should inform their accommodation about their itinerary and expected return time.',
    date: 'April 10, 2023',
    areas: ['Remote tribal villages', 'Deep forest areas', 'Border regions', 'Island territories'],
  },
];

const SafetyPage: React.FC = () => {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const toggleTip = (id: number) => {
    if (expandedTip === id) {
      setExpandedTip(null);
    } else {
      setExpandedTip(id);
    }
  };

  const categories = ['All', ...Array.from(new Set(safetyTips.map(tip => tip.category)))];

  const filteredTips = activeCategory === 'All' 
    ? safetyTips 
    : safetyTips.filter(tip => tip.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section with SOS Button */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Emergency & Safety</h1>
          <p className="text-xl max-w-3xl mb-6">Your safety is our priority. Access emergency contacts, travel advisories, and safety tips.</p>
          
          <motion.button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full flex items-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center"><IconPhone className="mr-2" /> SOS EMERGENCY</span>
          </motion.button>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-16 relative z-20 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact) => (
              <motion.div 
                key={contact.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{contact.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{contact.description}</p>
                    <a 
                      href={`tel:${contact.number}`} 
                      className="bg-primary text-white text-lg font-bold py-2 px-4 rounded inline-block hover:bg-primary-dark transition-colors"
                    >
                      {contact.number}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Advisories Section */}
      <section className="container-custom py-8">
        <h2 className="text-2xl font-bold mb-6">Current Travel Advisories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {travelAdvisories.map((advisory) => (
            <motion.div 
              key={advisory.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`p-4 text-white ${advisory.level === 'low' ? 'bg-green-600' : advisory.level === 'moderate' ? 'bg-yellow-500' : 'bg-red-600'}`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{advisory.title}</h3>
                  <span className="text-sm font-medium px-2 py-1 bg-white rounded-full text-gray-800">
                    {advisory.level === 'low' ? 'Low Risk' : advisory.level === 'moderate' ? 'Moderate Risk' : 'High Risk'}
                  </span>
                </div>
                <p className="text-sm mt-1">Updated: {advisory.date}</p>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-4">{advisory.description}</p>
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Affected Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {advisory.areas.map((area, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="container-custom py-8">
        <h2 className="text-2xl font-bold mb-6">Safety Tips</h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="border-b border-gray-200 last:border-b-0">
              <button
                className="w-full text-left p-4 focus:outline-none"
                onClick={() => toggleTip(tip.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{tip.title}</h3>
                      <p className="text-sm text-gray-500">{tip.category}</p>
                    </div>
                  </div>
                  <div>
                    {expandedTip === tip.id ? 
                      <IconChevronUp className="text-gray-500" />
                     : 
                      <IconChevronDown className="text-gray-500" />
                    }
                  </div>
                </div>
              </button>
              {expandedTip === tip.id && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-gray-700 ml-10">{tip.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Preparedness Section */}
      <section className="container-custom py-8 mb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary text-white p-6">
            <h2 className="text-2xl font-bold mb-2">Emergency Preparedness</h2>
            <p>Being prepared can make all the difference in an emergency situation. Follow these guidelines to stay safe during your travels in Jharkhand.</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Before Your Trip</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Research your destination thoroughly, including local customs and potential hazards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Share your itinerary with family or friends who aren't traveling with you</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Save emergency contacts on your phone and write them down on paper as backup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Pack a basic first-aid kit and any necessary medications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Check weather forecasts and travel advisories before departure</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">During an Emergency</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Stay calm and assess the situation before taking action</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Call the appropriate emergency number based on your situation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>If in a remote area with no signal, move to higher ground if possible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Follow instructions from local authorities and emergency personnel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>If lost, stay where you are and make yourself visible to rescuers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Safety Guide CTA */}
      <section className="container-custom py-8">
        <div className="bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-bold mb-4">Download Our Comprehensive Safety Guide</h2>
              <p className="mb-6">Get our detailed safety guide with offline maps, emergency protocols, and local information. Available in multiple languages.</p>
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </motion.button>
                <motion.button 
                  className="border border-white text-white font-bold py-3 px-6 rounded-md flex items-center hover:bg-white hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share Guide
                </motion.button>
              </div>
            </div>
            <div 
              className="md:w-1/3 bg-cover bg-center hidden md:block" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541417904950-b855846fe074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1041&q=80')" }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyPage;