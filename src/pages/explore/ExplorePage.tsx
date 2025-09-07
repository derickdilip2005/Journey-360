import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import LeafletMap from '../../components/LeafletMap';

// Types
interface IndianState {
  id: number;
  name: string;
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  capital: string;
  description: string;
  image: string;
  touristSpots: TouristSpot[];
}

interface TouristSpot {
  id: number;
  name: string;
  category: 'nature' | 'heritage' | 'adventure' | 'spiritual' | 'festival';
  description: string;
  image: string;
  activities: string[];
  localFood: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  bestTime: string;
  timings: string;
  hasVR: boolean;
  hasAR: boolean;
}

// Sample data for Indian states
const indianStates: IndianState[] = [
  {
    id: 1,
    name: 'Rajasthan',
    region: 'west',
    capital: 'Jaipur',
    description: 'The Land of Kings, famous for its royal palaces, desert landscapes, and vibrant culture.',
    image: 'https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 101,
        name: 'Jaipur City Palace',
        category: 'heritage',
        description: 'A magnificent palace complex showcasing Rajasthani and Mughal architecture.',
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        activities: ['Palace Tours', 'Photography', 'Museum Visits', 'Cultural Shows'],
        localFood: ['Dal Baati Churma', 'Ghevar', 'Laal Maas', 'Kachori'],
        dosAndDonts: {
          dos: ['Dress modestly', 'Carry camera', 'Book guided tours'],
          donts: ['Touch artifacts', 'Use flash in museums', 'Ignore dress code']
        },
        bestTime: 'October to March',
        timings: '9:30 AM - 5:00 PM',
        hasVR: true,
        hasAR: true
      },
      {
        id: 102,
        name: 'Thar Desert',
        category: 'adventure',
        description: 'Experience the golden sands and camel safaris in the Great Indian Desert.',
        image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Camel Safari', 'Desert Camping', 'Folk Dance Shows', 'Stargazing'],
        localFood: ['Ker Sangri', 'Bajre ki Roti', 'Gatte ki Sabzi', 'Rabri'],
        dosAndDonts: {
          dos: ['Carry sunscreen', 'Wear light clothes', 'Stay hydrated'],
          donts: ['Go alone at night', 'Ignore guide instructions', 'Litter in desert']
        },
        bestTime: 'November to February',
        timings: 'All day (safaris at sunrise/sunset)',
        hasVR: true,
        hasAR: false
      },
      {
        id: 103,
        name: 'Amber Fort',
        category: 'heritage',
        description: 'A majestic fort palace known for its artistic Hindu style elements.',
        image: 'https://plus.unsplash.com/premium_photo-1661962387472-553d96ed01a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Fort Exploration', 'Elephant Rides', 'Light Shows', 'Photography'],
        localFood: ['Pyaaz Kachori', 'Mirchi Bada', 'Kulfi', 'Lassi'],
        dosAndDonts: {
          dos: ['Wear comfortable shoes', 'Carry water', 'Book elephant rides early'],
          donts: ['Miss the mirror palace', 'Ignore safety barriers', 'Feed animals']
        },
        bestTime: 'October to March',
        timings: '8:00 AM - 6:00 PM',
        hasVR: false,
        hasAR: true
      }
    ]
  },
  {
    id: 2,
    name: 'Kerala',
    region: 'south',
    capital: 'Thiruvananthapuram',
    description: 'God\'s Own Country, known for backwaters, hill stations, and Ayurvedic treatments.',
    image: 'https://images.unsplash.com/photo-1589983846997-04788035bc83?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 201,
        name: 'Alleppey Backwaters',
        category: 'nature',
        description: 'Serene backwaters perfect for houseboat cruises and experiencing local life.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        activities: ['Houseboat Cruise', 'Fishing', 'Village Tours', 'Ayurvedic Spa'],
        localFood: ['Fish Curry', 'Appam', 'Puttu', 'Banana Chips'],
        dosAndDonts: {
          dos: ['Book houseboat in advance', 'Carry mosquito repellent', 'Respect local customs'],
          donts: ['Pollute water bodies', 'Disturb wildlife', 'Ignore safety instructions']
        },
        bestTime: 'November to February',
        timings: 'All day (houseboat stays available)',
        hasVR: true,
        hasAR: true
      },
      {
        id: 202,
        name: 'Munnar Hill Station',
        category: 'nature',
        description: 'Famous for tea plantations, rolling hills, and cool climate.',
        image: 'https://images.unsplash.com/photo-1637066742971-726bee8d9f56?q=80&w=1249&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Tea Plantation Tours', 'Trekking', 'Photography', 'Spice Shopping'],
        localFood: ['Kerala Sadya', 'Ela Ada', 'Pazham Pori', 'Cardamom Tea'],
        dosAndDonts: {
          dos: ['Carry warm clothes', 'Book tea garden tours', 'Try local spices'],
          donts: ['Pluck tea leaves', 'Litter in plantations', 'Miss sunrise viewpoints']
        },
        bestTime: 'September to March',
        timings: 'All day',
        hasVR: true,
        hasAR: false
      },
      {
        id: 203,
        name: 'Kochi Fort',
        category: 'heritage',
        description: 'Historic fort area with colonial architecture and Chinese fishing nets.',
        image: 'https://plus.unsplash.com/premium_photo-1691960159629-2148e8088aea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Heritage Walks', 'Sunset Viewing', 'Art Gallery Visits', 'Boat Rides'],
        localFood: ['Karimeen Curry', 'Prawn Moilee', 'Beef Fry', 'Coconut Water'],
        dosAndDonts: {
          dos: ['Visit during sunset', 'Explore art galleries', 'Try seafood'],
          donts: ['Miss Chinese fishing nets', 'Ignore local guides', 'Rush through']
        },
        bestTime: 'October to March',
        timings: '6:00 AM - 8:00 PM',
        hasVR: false,
        hasAR: true
      }
    ]
  },
  {
    id: 3,
    name: 'Himachal Pradesh',
    region: 'north',
    capital: 'Shimla',
    description: 'The Land of Gods, featuring snow-capped mountains, hill stations, and adventure sports.',
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 301,
        name: 'Manali',
        category: 'adventure',
        description: 'A popular hill station offering stunning mountain views and adventure activities.',
        image: 'https://images.unsplash.com/photo-1712388430474-ace0c16051e2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Paragliding', 'River Rafting', 'Trekking', 'Skiing'],
        localFood: ['Dham', 'Chana Madra', 'Babru', 'Aktori'],
        dosAndDonts: {
          dos: ['Carry warm clothes', 'Book accommodation early', 'Stay hydrated'],
          donts: ['Litter in mountains', 'Ignore altitude sickness', 'Trek alone']
        },
        bestTime: 'March to June, September to December',
        timings: 'All day',
        hasVR: true,
        hasAR: true
      },
      {
        id: 302,
        name: 'Shimla',
        category: 'heritage',
        description: 'The summer capital of British India, known for colonial architecture and toy train.',
        image: 'https://images.unsplash.com/photo-1657894736581-ccc35d62d9e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Toy Train Ride', 'Mall Road Shopping', 'Heritage Walks', 'Photography'],
        localFood: ['Sidu', 'Thukpa', 'Momos', 'Apple Juice'],
        dosAndDonts: {
          dos: ['Book toy train early', 'Carry warm clothes', 'Try local apples'],
          donts: ['Miss sunset point', 'Ignore weather warnings', 'Litter on trails']
        },
        bestTime: 'March to June, September to November',
        timings: 'All day',
        hasVR: false,
        hasAR: true
      },
      {
        id: 303,
        name: 'Dharamshala',
        category: 'spiritual',
        description: 'Home to the Dalai Lama and Tibetan culture, offering peace and mountain views.',
        image: 'https://images.unsplash.com/photo-1625401586082-9a9b17bc4ce5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Monastery Visits', 'Meditation', 'Trekking', 'Cultural Tours'],
        localFood: ['Tibetan Bread', 'Butter Tea', 'Tingmo', 'Gundruk'],
        dosAndDonts: {
          dos: ['Respect monastery rules', 'Learn about Tibetan culture', 'Carry warm clothes'],
          donts: ['Disturb meditation sessions', 'Take photos without permission', 'Ignore local customs']
        },
        bestTime: 'March to June, September to December',
        timings: 'All day',
        hasVR: true,
        hasAR: false
      }
    ]
  },
  {
    id: 4,
    name: 'Goa',
    region: 'west',
    capital: 'Panaji',
    description: 'Famous for its beaches, Portuguese heritage, and vibrant nightlife.',
    image: 'https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 401,
        name: 'Baga Beach',
        category: 'nature',
        description: 'One of the most popular beaches in North Goa, perfect for water sports and nightlife.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        activities: ['Water Sports', 'Beach Volleyball', 'Sunbathing', 'Nightlife'],
        localFood: ['Fish Curry Rice', 'Bebinca', 'Feni', 'Prawn Balchão'],
        dosAndDonts: {
          dos: ['Use sunscreen', 'Stay hydrated', 'Respect local culture'],
          donts: ['Swim during rough weather', 'Litter on beach', 'Ignore lifeguard warnings']
        },
        bestTime: 'November to March',
        timings: 'All day',
        hasVR: true,
        hasAR: true
      },
      {
        id: 402,
        name: 'Old Goa Churches',
        category: 'heritage',
        description: 'UNESCO World Heritage Site featuring beautiful Portuguese colonial churches.',
        image: 'https://media.istockphoto.com/id/184867271/photo/church-in-panjim.webp?a=1&b=1&s=612x612&w=0&k=20&c=26yPf75DYw5ZFSW66Yfdd4kKJDL8uszxqYXrS-3KV2M=',
        activities: ['Church Tours', 'Photography', 'Heritage Walks', 'Museum Visits'],
        localFood: ['Pork Vindaloo', 'Sorpotel', 'Sannas', 'Cashew Nuts'],
        dosAndDonts: {
          dos: ['Dress modestly', 'Respect religious sites', 'Hire local guides'],
          donts: ['Make noise during services', 'Touch artifacts', 'Ignore photography rules']
        },
        bestTime: 'November to March',
        timings: '9:00 AM - 6:00 PM',
        hasVR: false,
        hasAR: true
      },
      {
        id: 403,
        name: 'Dudhsagar Falls',
        category: 'nature',
        description: 'One of India\'s tallest waterfalls, creating a spectacular milky cascade.',
        image: 'https://images.unsplash.com/photo-1652120704209-14cbc87b603f?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Waterfall Viewing', 'Trekking', 'Train Spotting', 'Photography'],
        localFood: ['Goan Fish Thali', 'Coconut Rice', 'Solkadhi', 'Cashew Feni'],
        dosAndDonts: {
          dos: ['Visit during monsoon', 'Wear trekking shoes', 'Carry water'],
          donts: ['Swim in falls', 'Go too close to edge', 'Litter around']
        },
        bestTime: 'June to September',
        timings: '7:00 AM - 5:00 PM',
        hasVR: true,
        hasAR: false
      }
    ]
  },
  {
    id: 5,
    name: 'Tamil Nadu',
    region: 'south',
    capital: 'Chennai',
    description: 'Rich in temple architecture, classical arts, and diverse landscapes from beaches to hills.',
    image: 'https://plus.unsplash.com/premium_photo-1697729444936-8c6a6f643312?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 501,
        name: 'Meenakshi Temple',
        category: 'spiritual',
        description: 'A historic Hindu temple dedicated to Meenakshi, known for its stunning architecture.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        activities: ['Temple Tours', 'Photography', 'Cultural Programs', 'Prayer Services'],
        localFood: ['Chettinad Chicken', 'Dosa', 'Idli', 'Filter Coffee'],
        dosAndDonts: {
          dos: ['Dress modestly', 'Remove shoes', 'Maintain silence'],
          donts: ['Use mobile phones inside', 'Touch sculptures', 'Wear leather items']
        },
        bestTime: 'October to March',
        timings: '5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM',
        hasVR: true,
        hasAR: true
      },
      {
        id: 502,
        name: 'Ooty Hill Station',
        category: 'nature',
        description: 'Queen of Hill Stations with beautiful gardens, lakes, and toy train rides.',
        image: 'https://images.unsplash.com/photo-1632678008080-723a9c4a58e7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Toy Train Ride', 'Boating', 'Garden Visits', 'Photography'],
        localFood: ['Ooty Chocolate', 'Varkey', 'Nilgiri Tea', 'Homemade Cheese'],
        dosAndDonts: {
          dos: ['Book toy train early', 'Carry warm clothes', 'Visit botanical garden'],
          donts: ['Miss lake boating', 'Ignore weather changes', 'Litter in nature']
        },
        bestTime: 'April to June, September to November',
        timings: 'All day',
        hasVR: false,
        hasAR: true
      },
      {
        id: 503,
        name: 'Mahabalipuram',
        category: 'heritage',
        description: 'UNESCO World Heritage Site famous for ancient rock-cut temples and sculptures.',
        image: 'https://images.unsplash.com/photo-1717480103667-fc55675a9ae4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Temple Tours', 'Sculpture Viewing', 'Beach Visits', 'Photography'],
        localFood: ['Fish Curry', 'Coconut Rice', 'Banana Leaf Meals', 'Payasam'],
        dosAndDonts: {
          dos: ['Hire local guides', 'Visit early morning', 'Respect monuments'],
          donts: ['Touch ancient sculptures', 'Climb on monuments', 'Miss shore temple']
        },
        bestTime: 'November to March',
        timings: '6:00 AM - 6:00 PM',
        hasVR: true,
        hasAR: false
      }
    ]
  },
  {
    id: 6,
    name: 'Maharashtra',
    region: 'west',
    capital: 'Mumbai',
    description: 'The commercial capital of India, featuring Bollywood, caves, and hill stations.',
    image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    touristSpots: [
      {
        id: 601,
        name: 'Ajanta Caves',
        category: 'heritage',
        description: 'Ancient Buddhist cave monuments dating back to 2nd century BCE.',
        image: 'https://plus.unsplash.com/premium_photo-1697729588019-20a1f5a325d1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Guided Tours', 'Photography', 'Historical Study', 'Art Appreciation'],
        localFood: ['Vada Pav', 'Puran Poli', 'Misal Pav', 'Bhel Puri'],
        dosAndDonts: {
          dos: ['Hire a guide', 'Carry water', 'Wear comfortable shoes'],
          donts: ['Touch cave paintings', 'Use flash photography', 'Make loud noises']
        },
        bestTime: 'November to March',
        timings: '9:00 AM - 5:30 PM (Closed on Mondays)',
        hasVR: true,
        hasAR: true
      },
      {
        id: 602,
        name: 'Gateway of India',
        category: 'heritage',
        description: 'Iconic monument in Mumbai, built to commemorate the visit of King George V.',
        image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2F0ZXdheSUyMG9mJTIwaW5kaWElMjBtdW1iYWl8ZW58MHx8MHx8fDA%3D',
        activities: ['Photography', 'Boat Rides', 'Street Food', 'Heritage Walks'],
        localFood: ['Pav Bhaji', 'Bombay Duck', 'Solkadhi', 'Modak'],
        dosAndDonts: {
          dos: ['Visit during sunset', 'Try street food', 'Take boat to Elephanta'],
          donts: ['Miss the architecture', 'Ignore safety while boating', 'Litter around']
        },
        bestTime: 'November to March',
        timings: 'All day',
        hasVR: false,
        hasAR: true
      },
      {
        id: 603,
        name: 'Lonavala Hill Station',
        category: 'nature',
        description: 'Popular hill station known for its scenic beauty, waterfalls, and pleasant climate.',
        image: 'https://images.unsplash.com/photo-1708547981669-a28c8171727e?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Trekking', 'Waterfall Visits', 'Cave Exploration', 'Photography'],
        localFood: ['Chikki', 'Fudge', 'Corn Bhel', 'Vada Pav'],
        dosAndDonts: {
          dos: ['Visit during monsoon', 'Try local chikki', 'Explore Karla caves'],
          donts: ['Miss Tiger Point', 'Ignore weather warnings', 'Litter in nature']
        },
        bestTime: 'June to September, October to March',
        timings: 'All day',
        hasVR: true,
        hasAR: false
      }
    ]
  },
  {
    id: 7,
    name: 'Delhi',
    region: 'north',
    capital: 'New Delhi',
    description: 'The capital of India, rich in history with Mughal architecture, modern infrastructure, and vibrant street food culture.',
    image: 'https://images.unsplash.com/photo-1592639296346-560c37a0f711?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 701,
        name: 'Red Fort',
        category: 'heritage',
        description: 'A UNESCO World Heritage Site and symbol of India, showcasing Mughal architecture.',
        image: 'https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Historical Tours', 'Light & Sound Show', 'Photography', 'Museum Visits'],
        localFood: ['Chole Bhature', 'Paranthas', 'Kebabs', 'Kulfi'],
        dosAndDonts: {
          dos: ['Carry ID proof', 'Book tickets online', 'Wear comfortable shoes'],
          donts: ['Carry prohibited items', 'Touch historical artifacts', 'Ignore security guidelines']
        },
        bestTime: 'October to March',
        timings: '9:30 AM - 4:30 PM (Closed on Mondays)',
        hasVR: true,
        hasAR: true
      },
      {
        id: 702,
        name: 'India Gate',
        category: 'heritage',
        description: 'War memorial dedicated to Indian soldiers, surrounded by beautiful gardens.',
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        activities: ['Photography', 'Evening Walks', 'Picnicking', 'Street Food'],
        localFood: ['Gol Gappa', 'Chaat', 'Ice Cream', 'Corn'],
        dosAndDonts: {
          dos: ['Visit during evening', 'Try street food', 'Enjoy the gardens'],
          donts: ['Litter around', 'Ignore traffic rules', 'Miss the lighting']
        },
        bestTime: 'October to March',
        timings: 'All day',
        hasVR: false,
        hasAR: true
      },
      {
        id: 703,
        name: 'Lotus Temple',
        category: 'spiritual',
        description: 'Bahai House of Worship known for its unique lotus-shaped architecture.',
        image: 'https://images.unsplash.com/photo-1722477249866-0a920e6d3013?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Meditation', 'Photography', 'Architecture Study', 'Peaceful Walks'],
        localFood: ['Delhi Street Food', 'Lassi', 'Samosa', 'Jalebi'],
        dosAndDonts: {
          dos: ['Maintain silence', 'Remove shoes', 'Respect all faiths'],
          donts: ['Make noise', 'Take photos inside', 'Bring food inside']
        },
        bestTime: 'October to March',
        timings: '9:00 AM - 7:00 PM (Closed on Mondays)',
        hasVR: true,
        hasAR: false
      }
    ]
  },
  {
    id: 8,
    name: 'Uttar Pradesh',
    region: 'north',
    capital: 'Lucknow',
    description: 'Home to the iconic Taj Mahal, rich Mughal heritage, and spiritual destinations along the Ganges.',
    image: 'https://images.unsplash.com/photo-1706186839147-0d708602587b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 801,
        name: 'Taj Mahal',
        category: 'heritage',
        description: 'A UNESCO World Heritage Site and one of the Seven Wonders of the World, symbol of eternal love.',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        activities: ['Photography', 'Guided Tours', 'Sunset Viewing', 'Architecture Study'],
        localFood: ['Petha', 'Bedai', 'Jalebi', 'Tunday Kebab'],
        dosAndDonts: {
          dos: ['Carry water bottle', 'Wear comfortable shoes', 'Book tickets online'],
          donts: ['Touch the monument', 'Carry food inside', 'Use flash photography']
        },
        bestTime: 'October to March',
        timings: '6:00 AM - 6:30 PM (Closed on Fridays)',
        hasVR: true,
        hasAR: true
      },
      {
        id: 802,
        name: 'Varanasi Ghats',
        category: 'spiritual',
        description: 'Sacred ghats along the Ganges River, center of Hindu pilgrimage and spirituality.',
        image: 'https://plus.unsplash.com/premium_photo-1697730304380-2ed1c7aea373?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Ganga Aarti', 'Boat Rides', 'Temple Visits', 'Photography'],
        localFood: ['Kachori Sabzi', 'Lassi', 'Chaat', 'Malaiyo'],
        dosAndDonts: {
          dos: ['Respect religious customs', 'Attend evening aarti', 'Hire local guide'],
          donts: ['Disturb prayers', 'Pollute the river', 'Ignore local customs']
        },
        bestTime: 'October to March',
        timings: 'All day (Aarti at sunset)',
        hasVR: false,
        hasAR: true
      },
      {
        id: 803,
        name: 'Fatehpur Sikri',
        category: 'heritage',
        description: 'Abandoned Mughal city, UNESCO World Heritage Site with stunning architecture.',
        image: 'https://images.unsplash.com/photo-1717761558642-32cbeccbee7e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Historical Tours', 'Photography', 'Architecture Study', 'Museum Visits'],
        localFood: ['Agra Petha', 'Dalmoth', 'Gajak', 'Paratha'],
        dosAndDonts: {
          dos: ['Hire a guide', 'Carry water', 'Wear comfortable shoes'],
          donts: ['Touch monuments', 'Ignore historical significance', 'Miss Buland Darwaza']
        },
        bestTime: 'October to March',
        timings: '6:00 AM - 6:00 PM',
        hasVR: true,
        hasAR: false
      }
    ]
  },
  {
    id: 9,
    name: 'Jharkhand',
    region: 'east',
    capital: 'Ranchi',
    description: 'Known for its waterfalls, tribal culture, wildlife sanctuaries, and mineral-rich landscapes.',
    image: 'https://images.unsplash.com/photo-1619500765355-8ba767d6e261?q=80&w=1297&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 901,
        name: 'Hundru Falls',
        category: 'nature',
        description: 'One of the highest waterfalls in Jharkhand, offering spectacular views and natural beauty.',
        image: 'https://images.unsplash.com/photo-1558451701-4662b9367fc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Waterfall Viewing', 'Photography', 'Trekking', 'Picnicking'],
        localFood: ['Litti Chokha', 'Dhuska', 'Rugra', 'Handia'],
        dosAndDonts: {
          dos: ['Wear non-slip shoes', 'Carry water', 'Visit during daylight'],
          donts: ['Swim during monsoon', 'Go too close to edge', 'Litter around']
        },
        bestTime: 'October to March',
        timings: '6:00 AM - 6:00 PM',
        hasVR: true,
        hasAR: true
      },
      {
        id: 902,
        name: 'Betla National Park',
        category: 'nature',
        description: 'Wildlife sanctuary known for tigers, elephants, and diverse flora and fauna.',
        image: 'https://plus.unsplash.com/premium_photo-1733493684000-9e32eaf89c60?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Wildlife Safari', 'Bird Watching', 'Photography', 'Nature Walks'],
        localFood: ['Tribal Cuisine', 'Bamboo Shoot Curry', 'Mahua', 'Forest Honey'],
        dosAndDonts: {
          dos: ['Book safari in advance', 'Follow guide instructions', 'Carry binoculars'],
          donts: ['Make loud noises', 'Feed animals', 'Litter in forest']
        },
        bestTime: 'November to April',
        timings: '6:00 AM - 6:00 PM',
        hasVR: false,
        hasAR: true
      },
      {
        id: 903,
        name: 'Ranchi Hill Station',
        category: 'nature',
        description: 'Capital city surrounded by hills, waterfalls, and pleasant climate.',
        image: 'https://images.unsplash.com/photo-1751815562767-2adcf527820c?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Hill Trekking', 'Temple Visits', 'Lake Boating', 'Photography'],
        localFood: ['Thekua', 'Pittha', 'Arsa', 'Kheer Mohan'],
        dosAndDonts: {
          dos: ['Visit Tagore Hill', 'Try local sweets', 'Explore Rock Garden'],
          donts: ['Miss sunset points', 'Ignore tribal culture', 'Litter on hills']
        },
        bestTime: 'October to March',
        timings: 'All day',
        hasVR: true,
        hasAR: false
      }
    ]
  },
  {
    id: 10,
    name: 'Sikkim',
    region: 'northeast',
    capital: 'Gangtok',
    description: 'A Himalayan state known for its biodiversity, monasteries, and stunning mountain views.',
    image: 'https://images.unsplash.com/photo-1573398643956-2b9e6ade3456?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 1001,
        name: 'Gangtok',
        category: 'nature',
        description: 'Capital city offering panoramic views of Kanchenjunga and vibrant local culture.',
        image: 'https://images.unsplash.com/photo-1635346537940-9d51faeb6e32?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Cable Car Rides', 'Monastery Visits', 'Shopping', 'Photography'],
        localFood: ['Momos', 'Thukpa', 'Gundruk', 'Sel Roti'],
        dosAndDonts: {
          dos: ['Carry warm clothes', 'Respect local culture', 'Try local cuisine'],
          donts: ['Litter in mountains', 'Ignore altitude effects', 'Miss sunrise views']
        },
        bestTime: 'March to June, September to December',
        timings: 'All day',
        hasVR: true,
        hasAR: true
      },
      {
        id: 1002,
        name: 'Nathula Pass',
        category: 'adventure',
        description: 'High-altitude mountain pass on the Indo-China border with breathtaking views.',
        image: 'https://images.unsplash.com/photo-1697561832430-daebcb737292?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Border Viewing', 'Photography', 'Mountain Trekking', 'Cultural Tours'],
        localFood: ['Yak Cheese', 'Butter Tea', 'Tibetan Bread', 'Chhurpi'],
        dosAndDonts: {
          dos: ['Carry permits', 'Dress warmly', 'Acclimatize properly'],
          donts: ['Cross border lines', 'Ignore weather warnings', 'Take unauthorized photos']
        },
        bestTime: 'May to October',
        timings: '9:00 AM - 3:00 PM (Permit required)',
        hasVR: false,
        hasAR: true
      },
      {
        id: 1003,
        name: 'Tsomgo Lake',
        category: 'nature',
        description: 'Sacred glacial lake surrounded by snow-capped mountains and alpine flowers.',
        image: 'https://images.unsplash.com/photo-1648113821624-244c6c1baf54?q=80&w=1182&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Lake Viewing', 'Yak Rides', 'Photography', 'Prayer Flag Hanging'],
        localFood: ['Maggi Noodles', 'Tea', 'Local Snacks', 'Hot Soup'],
        dosAndDonts: {
          dos: ['Carry oxygen if needed', 'Respect sacred site', 'Wear warm clothes'],
          donts: ['Pollute the lake', 'Disturb wildlife', 'Ignore altitude sickness']
        },
        bestTime: 'March to June, September to December',
        timings: '8:00 AM - 4:00 PM',
        hasVR: true,
        hasAR: false
      }
    ]
  },
  {
    id: 11,
    name: 'Madhya Pradesh',
    region: 'central',
    capital: 'Bhopal',
    description: 'The Heart of India, known for its wildlife sanctuaries, ancient temples, and rich cultural heritage.',
    image: 'https://plus.unsplash.com/premium_photo-1661930618375-aafabc2bf3e7?q=80&w=1099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    touristSpots: [
      {
        id: 1101,
        name: 'Khajuraho Temples',
        category: 'heritage',
        description: 'UNESCO World Heritage Site famous for intricate sculptures and ancient architecture.',
        image: 'https://plus.unsplash.com/premium_photo-1697730370661-51bf72769ff6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Temple Tours', 'Photography', 'Cultural Shows', 'Archaeological Study'],
        localFood: ['Bafla', 'Dal Bafla', 'Poha', 'Jalebi'],
        dosAndDonts: {
          dos: ['Hire local guides', 'Respect ancient art', 'Visit during cooler hours'],
          donts: ['Touch sculptures', 'Miss light and sound show', 'Ignore historical significance']
        },
        bestTime: 'October to March',
        timings: '6:00 AM - 6:00 PM',
        hasVR: true,
        hasAR: true
      },
      {
        id: 1102,
        name: 'Bandhavgarh National Park',
        category: 'nature',
        description: 'Famous tiger reserve with high density of tigers and diverse wildlife.',
        image: 'https://images.unsplash.com/photo-1701368533954-f0dc06ebfbed?q=80&w=1118&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Tiger Safari', 'Wildlife Photography', 'Bird Watching', 'Nature Walks'],
        localFood: ['Tribal Cuisine', 'Bhutte ka Kees', 'Sabudana Khichdi', 'Malpua'],
        dosAndDonts: {
          dos: ['Book safari early', 'Follow park rules', 'Carry binoculars'],
          donts: ['Make noise during safari', 'Feed animals', 'Litter in park']
        },
        bestTime: 'October to June',
        timings: '6:00 AM - 11:00 AM, 3:00 PM - 6:00 PM',
        hasVR: false,
        hasAR: true
      },
      {
        id: 1103,
        name: 'Sanchi Stupa',
        category: 'spiritual',
        description: 'Ancient Buddhist monument and UNESCO World Heritage Site dating back to 3rd century BCE.',
        image: 'https://images.unsplash.com/photo-1585744944048-846da0c3054c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        activities: ['Historical Tours', 'Meditation', 'Photography', 'Archaeological Study'],
        localFood: ['Chana Dal', 'Kachori', 'Samosa', 'Lassi'],
        dosAndDonts: {
          dos: ['Respect Buddhist traditions', 'Hire knowledgeable guides', 'Visit museum'],
          donts: ['Touch ancient structures', 'Miss the intricate carvings', 'Ignore historical context']
        },
        bestTime: 'October to March',
        timings: '9:00 AM - 5:00 PM',
        hasVR: true,
        hasAR: false
      }
    ]
  }
];

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<IndianState | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<{ name: string; coords: { lat: number; lng: number } } | null>(null);

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDuQKRddXVyEs3lzMj4wSFmZz_B1Vt7qwA';

  // Define coordinates for all tourist locations
  const locationCoordinates: { [key: string]: { lat: number; lng: number } } = {
    // Rajasthan
    'Jaipur City Palace': { lat: 26.9255, lng: 75.8235 },
    'Thar Desert': { lat: 27.0238, lng: 70.8322 },
    'Amber Fort': { lat: 26.9855, lng: 75.8513 },
    
    // Kerala
    'Alleppey Backwaters': { lat: 9.4981, lng: 76.3388 },
    'Munnar Hill Station': { lat: 10.0889, lng: 77.0595 },
    'Kochi Fort': { lat: 9.9647, lng: 76.2424 },
    
    // Himachal Pradesh
    'Manali': { lat: 32.2396, lng: 77.1887 },
    'Shimla': { lat: 31.1048, lng: 77.1734 },
    'Dharamshala': { lat: 32.2190, lng: 76.3234 },
    
    // Goa
    'Baga Beach': { lat: 15.5557, lng: 73.7515 },
    'Old Goa Churches': { lat: 15.5007, lng: 73.9117 },
    'Dudhsagar Falls': { lat: 15.3144, lng: 74.3144 },
    
    // Tamil Nadu
    'Meenakshi Temple': { lat: 9.9195, lng: 78.1193 },
    'Ooty Hill Station': { lat: 11.4064, lng: 76.6932 },
    'Mahabalipuram': { lat: 12.6269, lng: 80.1927 },
    
    // Maharashtra
    'Ajanta Caves': { lat: 20.5519, lng: 75.7033 },
    'Gateway of India': { lat: 18.9220, lng: 72.8347 },
    'Lonavala Hill Station': { lat: 18.7537, lng: 73.4068 },
    
    // Delhi
    'Red Fort': { lat: 28.6562, lng: 77.2410 },
    'India Gate': { lat: 28.6129, lng: 77.2295 },
    'Lotus Temple': { lat: 28.5535, lng: 77.2588 },
    
    // Uttar Pradesh
    'Taj Mahal': { lat: 27.1751, lng: 78.0421 },
    'Varanasi Ghats': { lat: 25.3176, lng: 82.9739 },
    'Fatehpur Sikri': { lat: 27.0945, lng: 77.6619 },
    
    // Jharkhand
    'Hundru Falls': { lat: 23.4315, lng: 85.5815 },
    'Betla National Park': { lat: 23.8738, lng: 84.1919 },
    'Ranchi Hill Station': { lat: 23.3441, lng: 85.3096 },
    
    // Sikkim
    'Gangtok': { lat: 27.3389, lng: 88.6065 },
    'Nathula Pass': { lat: 27.3914, lng: 88.8400 },
    'Tsomgo Lake': { lat: 27.4018, lng: 88.7575 },
    
    // Madhya Pradesh
    'Khajuraho Temples': { lat: 24.8318, lng: 79.9199 },
    'Bandhavgarh National Park': { lat: 23.7104, lng: 81.0304 },
    'Sanchi Stupa': { lat: 23.4793, lng: 77.7398 }
  };

  // Function to open VR view using panorama image
  const openVRView = (spotName: string) => {
    // Mapping of location names to their specific panoramic images
    const panoramaImages: { [key: string]: string } = {
      'Jaipur City Palace': 'https://images.pexels.com/photos/30276059/pexels-photo-30276059.png',
      'Meenakshi Temple': 'https://www.maduraimeenakshitemple.com/article/id/8497/madurai-meenakshi-temple',
      'Mahabalipuram': 'https://images.pexels.com/photos/7365981/pexels-photo-7365981.jpeg',
      'Gateway of India': 'https://cloudflare1.360gigapixels.com/pano/anilerayil/00939802_GOI_anil.jpg/equirect_crop_3_1/6.jpg',
      'Red Fort': 'https://upload.wikimedia.org/wikipedia/commons/0/01/Red_Fort_in_panorama.jpg',
      'Lotus Temple': 'https://preview.redd.it/x4f0vu93dri31.jpg?width=640&crop=smart&auto=webp&s=e42e73572f60a5090b1fe3e13fddec2f6cbbf660',
      'Fatehpur Sikri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp-Ei5LD5Oc5OgULmhmU-8DZma54HGVybvhA&s',
      'Khajuraho Temples': 'https://img.freepik.com/premium-photo/khajuraho-temple-panoramic-india_494619-3391.jpg',
      'Sanchi Stupa': 'https://rustiktravel.com/allindiaroadtrip/wp-content/uploads/2021/11/11-3.jpg'
    };
    
    // Get the specific panorama image for this location, fallback to default if not found
    const panoramaImage = panoramaImages[spotName] || 'https://images.pexels.com/photos/33777273/pexels-photo-33777273.jpeg';
    
    // Open in a new window with specific dimensions for VR experience
    const vrWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=no,resizable=yes');
    
    if (vrWindow) {
      vrWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>360° VR View - ${spotName}</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
          <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
          <style>
            body { margin: 0; padding: 0; background: #000; font-family: Arial, sans-serif; overflow: hidden; }
            #panorama { width: 100vw; height: 100vh; }
            .header { position: absolute; top: 0; left: 0; right: 0; background: rgba(0,0,0,0.9); color: white; padding: 15px 20px; z-index: 1000; display: flex; justify-content: space-between; align-items: center; }
            .close-btn { background: #ff4444; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
            .close-btn:hover { background: #ff6666; }
            .controls { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 10px 20px; border-radius: 25px; z-index: 1000; }
            .loading { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center; z-index: 1002; }
          </style>
        </head>
        <body>
          <div class="header">
            <h3>🥽 360° VR View: ${spotName}</h3>
            <div>
              <button class="close-btn" onclick="window.close()">✕ Close</button>
            </div>
          </div>
          <div id="loading" class="loading">
            <h3>Loading 360° Experience...</h3>
            <p>Please wait while we prepare your virtual tour</p>
          </div>
          <div id="panorama"></div>
          <div class="controls">
            <p>🖱️ Drag to look around • 🖱️ Scroll to zoom • 📱 Use touch gestures on mobile</p>
          </div>
          <script>
            document.addEventListener('DOMContentLoaded', function() {
              pannellum.viewer('panorama', {
                "type": "equirectangular",
                "panorama": "${panoramaImage}",
                "autoLoad": true,
                "autoRotate": -2,
                "compass": true,
                "showZoomCtrl": true,
                "showFullscreenCtrl": true,
                "showControls": true,
                "mouseZoom": true,
                "draggable": true,
                "keyboardZoom": true,
                "orientationOnByDefault": false,
                "hfov": 100,
                "pitch": 0,
                "yaw": 0,
                "minHfov": 50,
                "maxHfov": 120,
                "onLoad": function() {
                  document.getElementById('loading').style.display = 'none';
                },
                "onError": function(error) {
                  document.getElementById('loading').innerHTML = '<h3>Error loading 360° view</h3><p>Please try again later</p>';
                  console.error('Pannellum error:', error);
                }
              });
            });
          </script>
        </body>
        </html>
      `);
      vrWindow.document.close();
    }
  };

  // Function to show directions using Leaflet map
  const openDirections = (spotName: string) => {
    const coords = locationCoordinates[spotName];
    if (!coords) {
      alert(`Directions are not available for ${spotName} yet. Coming soon!`);
      return;
    }

    setSelectedDestination({ name: spotName, coords });
    setShowMap(true);
  };

  // Function to redirect to Uber with current location and destination
  const showCabFare = (spotName: string) => {
    const coords = locationCoordinates[spotName];
    if (!coords) {
      alert(`Uber booking is not available for ${spotName} yet. Coming soon!`);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // Create properly formatted Uber URL with JSON-encoded parameters
          const pickupData = {
            addressLine1: "Your current location",
            addressLine2: "Current location",
            source: "DEFAULT_DEVICE",
            latitude: userLat,
            longitude: userLng,
            provider: "google_places"
          };
          
          const dropoffData = {
            addressLine1: spotName,
            addressLine2: spotName,
            source: "SEARCH",
            latitude: coords.lat,
            longitude: coords.lng,
            provider: "google_places"
          };
          
          const encodedPickup = encodeURIComponent(JSON.stringify(pickupData));
          const encodedDropoff = encodeURIComponent(JSON.stringify(dropoffData));
          
          const uberUrl = `https://www.uber.com/go/product-selection?pickup=${encodedPickup}&pickup[latitude]=${userLat}&pickup[longitude]=${userLng}&drop[0]=${encodedDropoff}&dropoff[latitude]=${coords.lat}&dropoff[longitude]=${coords.lng}`;
          
          // Open Uber in a new tab
          window.open(uberUrl, '_blank');
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback: open Uber with just the destination
          const dropoffData = {
            addressLine1: spotName,
            addressLine2: spotName,
            source: "SEARCH",
            latitude: coords.lat,
            longitude: coords.lng,
            provider: "google_places"
          };
          
          const encodedDropoff = encodeURIComponent(JSON.stringify(dropoffData));
          const uberUrl = `https://www.uber.com/go/product-selection?drop[0]=${encodedDropoff}&dropoff[latitude]=${coords.lat}&dropoff[longitude]=${coords.lng}`;
          
          window.open(uberUrl, '_blank');
        }
      );
    } else {
      // Geolocation not supported, open Uber with just the destination
      const dropoffData = {
        addressLine1: spotName,
        addressLine2: spotName,
        source: "SEARCH",
        latitude: coords.lat,
        longitude: coords.lng,
        provider: "google_places"
      };
      
      const encodedDropoff = encodeURIComponent(JSON.stringify(dropoffData));
      const uberUrl = `https://www.uber.com/go/product-selection?drop[0]=${encodedDropoff}&dropoff[latitude]=${coords.lat}&dropoff[longitude]=${coords.lng}`;
      
      window.open(uberUrl, '_blank');
    }
  };

  // Function to navigate to Hotels page with pre-filled location
  const viewHotels = (spotName: string) => {
    navigate(`/hotels?location=${encodeURIComponent(spotName)}`);
  };

  // Filter states based on region and search query
  const filteredStates = indianStates.filter((state) => {
    const matchesRegion = selectedRegion === 'all' || state.region === selectedRegion;
    const matchesSearch = state.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          state.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          state.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Explore India</h1>
          <p className="text-xl max-w-3xl">Discover the incredible diversity, rich heritage, and cultural wonders of India</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-8 relative z-20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search states, capitals, regions..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion('all')}
                className={`px-4 py-2 rounded-md ${selectedRegion === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Regions
              </button>
              <button
                onClick={() => setSelectedRegion('north')}
                className={`px-4 py-2 rounded-md ${selectedRegion === 'north' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                North India
              </button>
              <button
                onClick={() => setSelectedRegion('south')}
                className={`px-4 py-2 rounded-md ${selectedRegion === 'south' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                South India
              </button>
              <button
                onClick={() => setSelectedRegion('east')}
                className={`px-4 py-2 rounded-md ${selectedRegion === 'east' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                East India
              </button>
              <button
                onClick={() => setSelectedRegion('west')}
                className={`px-4 py-2 rounded-md ${selectedRegion === 'west' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                West India
              </button>
              <button
                onClick={() => setSelectedRegion('central')}
                className={`px-4 py-2 rounded-md ${selectedRegion === 'central' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Central India
              </button>
              <button
                onClick={() => setSelectedRegion('northeast')}
                className={`px-4 py-2 rounded-md ${selectedRegion === 'northeast' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Northeast India
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Indian States Grid */}
      <section className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStates.map((state) => (
            <motion.div 
              key={state.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => setSelectedState(state)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={state.image} 
                  alt={state.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                  {state.region.charAt(0).toUpperCase() + state.region.slice(1)} India
                </div>
                <div className="absolute bottom-0 left-0 bg-secondary text-white px-3 py-1 m-2 rounded-full text-sm font-medium flex items-center">
                  <FaIcons.FaMapMarkerAlt className="mr-1" /> {state.touristSpots.length} Attractions
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{state.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaIcons.FaCity className="mr-2" />
                  <span>Capital: {state.capital}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{state.description}</p>
                <button className="text-primary font-medium hover:underline">
                  Explore State
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStates.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No states found matching your criteria</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </section>

      {/* State Detail Modal */}
      {selectedState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <button 
                onClick={() => setSelectedState(null)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <FaIcons.FaTimes className="text-gray-600" />
              </button>
              
              <div className="h-64 md:h-80 overflow-hidden rounded-t-lg">
                <img 
                  src={selectedState.image} 
                  alt={selectedState.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold">{selectedState.name}</h2>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedState.region.charAt(0).toUpperCase() + selectedState.region.slice(1)} India
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <FaIcons.FaCity className="mr-2" />
                  <span>Capital: {selectedState.capital}</span>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedState.description}</p>
                
                <h3 className="text-2xl font-semibold mb-4">Tourist Attractions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedState.touristSpots.map((spot) => (
                    <div 
                      key={spot.id}
                      className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedSpot(spot)}
                    >
                      <img 
                        src={spot.image} 
                        alt={spot.name} 
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold mb-2">{spot.name}</h4>
                      <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium mb-2 inline-block">
                        {spot.category.charAt(0).toUpperCase() + spot.category.slice(1)}
                      </span>
                      <p className="text-sm text-gray-700 line-clamp-2">{spot.description}</p>
                      <button className="text-primary text-sm font-medium mt-2 hover:underline">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tourist Spot Detail Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <button 
                onClick={() => {
                  setSelectedSpot(null);
                  setShowMap(false);
                  setSelectedDestination(null);
                }}
                className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <FaIcons.FaTimes className="text-gray-600" />
              </button>
              
              <div className="h-64 md:h-80 overflow-hidden rounded-t-lg">
                <img 
                  src={selectedSpot.image} 
                  alt={selectedSpot.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold">{selectedSpot.name}</h2>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedSpot.category.charAt(0).toUpperCase() + selectedSpot.category.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedSpot.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <FaIcons.FaHiking className="mr-2 text-primary" />
                      Key Activities
                    </h3>
                    <ul className="space-y-2">
                      {selectedSpot.activities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <FaIcons.FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <FaIcons.FaUtensils className="mr-2 text-primary" />
                      Local Delicacies
                    </h3>
                    <ul className="space-y-2">
                      {selectedSpot.localFood.map((food, index) => (
                        <li key={index} className="flex items-start">
                          <FaIcons.FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <FaIcons.FaCheckCircle className="mr-2 text-green-500" />
                      Do's
                    </h3>
                    <ul className="space-y-2">
                      {selectedSpot.dosAndDonts.dos.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaIcons.FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <FaIcons.FaTimesCircle className="mr-2 text-red-500" />
                      Don'ts
                    </h3>
                    <ul className="space-y-2">
                      {selectedSpot.dosAndDonts.donts.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaIcons.FaTimes className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <FaIcons.FaCalendarAlt className="mr-2 text-primary" />
                      Best Time to Visit
                    </h3>
                    <p className="text-gray-700">{selectedSpot.bestTime}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <FaIcons.FaClock className="mr-2 text-primary" />
                      Timings
                    </h3>
                    <p className="text-gray-700">{selectedSpot.timings}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  {selectedSpot.hasVR && (
                    <button 
                      onClick={() => openVRView(selectedSpot.name)}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center"
                    >
                      <FaIcons.FaVrCardboard className="mr-2" />
                      View in VR
                    </button>
                  )}
                  {selectedSpot.hasAR && (
                    <button className="bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-dark transition-colors flex items-center">
                      <FaIcons.FaCube className="mr-2" />
                      View in AR
                    </button>
                  )}
                  <button 
                    onClick={() => openDirections(selectedSpot.name)}
                    className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors flex items-center"
                  >
                    <FaIcons.FaDirections className="mr-2" />
                    Get Directions
                  </button>
                  <button 
                    onClick={() => viewHotels(selectedSpot.name)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <FaIcons.FaHotel className="mr-2" />
                    View Hotels
                  </button>
                </div>

                
                {/* Show cab fare button */}
                <div className="mt-4">
                  <button 
                    onClick={() => showCabFare(selectedSpot.name)}
                    className="border border-green-500 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-colors flex items-center"
                  >
                    <FaIcons.FaTaxi className="mr-2" />
                    Show Cab Fare
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Leaflet Map Component */}
      {showMap && selectedDestination && (
        <LeafletMap
          destinationName={selectedDestination.name}
          destinationCoords={selectedDestination.coords}
          onClose={() => {
            setShowMap(false);
            setSelectedDestination(null);
          }}
        />
      )}
    </div>
  );
};

export default ExplorePage;