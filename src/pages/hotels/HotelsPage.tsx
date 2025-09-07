import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

interface Hotel {
  id: string;
  name: string;
  starRating: number;
  priceRange: string;
  pricePerNight: number;
  image: string;
  distance: string;
  amenities: string[];
  location: string;
  description: string;
  bookingUrl: string;
  rating: number;
  reviewCount: number;
}

interface FilterState {
  priceRange: [number, number];
  starRating: number;
  distance: number;
  amenities: string[];
}

const HotelsPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 30000],
    starRating: 0,
    distance: 50,
    amenities: []
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock hotel data - In a real app, this would come from an API
  const mockHotels: Hotel[] = [
    // Rajasthan Hotels
    {
      id: '1',
      name: 'The Oberoi Rajvilas',
      starRating: 5,
      priceRange: '₹15,000 - ₹25,000',
      pricePerNight: 20000,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/48356404.jpg?k=94a7dba4725f4284d857358a3aa6bea0e3b3d342e52fa60ae761e44ea35c5074&o=',
      distance: '2.5 km from Jaipur City Palace',
      amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Room Service', 'Parking'],
      location: 'Jaipur City Palace',
      description: 'Luxury resort with traditional Rajasthani architecture and world-class amenities.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=The+Oberoi+Rajvilas+Jaipur&dest_type=hotel&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.8,
      reviewCount: 1250
    },
    {
      id: '2',
      name: 'Taj Rambagh Palace',
      starRating: 5,
      priceRange: '₹18,000 - ₹30,000',
      pricePerNight: 24000,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/19888904.jpg?k=14e400759ab32428779a1dc12ea757ea80a30a470de6fd6786cf6375039e6743&o=',
      distance: '3.2 km from Jaipur City Palace',
      amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Parking'],
      location: 'Jaipur City Palace',
      description: 'Former palace of the Maharaja of Jaipur, now a luxury heritage hotel.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Taj+Rambagh+Palace+Jaipur&dest_type=hotel&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.9,
      reviewCount: 2100
    },
    {
      id: '3',
      name: 'Desert Camp Thar',
      starRating: 3,
      priceRange: '₹3,500 - ₹6,000',
      pricePerNight: 4500,
      image: 'https://lh3.googleusercontent.com/p/AF1QipODUjM20OCJQjOaxiVci6UMM_SH3Ecrgb6pGBfp=w574-h384-n-k-rw-no-v1',
      distance: '5 km from Thar Desert',
      amenities: ['Wi-Fi', 'Restaurant', 'Cultural Shows', 'Camel Safari'],
      location: 'Thar Desert',
      description: 'Authentic desert camping experience with traditional Rajasthani hospitality.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Desert+Camp+Thar+Rajasthan&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.3,
      reviewCount: 680
    },
    {
      id: '4',
      name: 'Amber Fort Resort',
      starRating: 4,
      priceRange: '₹8,000 - ₹12,000',
      pricePerNight: 10000,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      distance: '1 km from Amber Fort',
      amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Heritage Tours'],
      location: 'Amber Fort',
      description: 'Heritage hotel offering stunning views of the historic Amber Fort.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Amber+Fort+Resort+Jaipur&dest_type=hotel&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.5,
      reviewCount: 920
    },
    
    // Kerala Hotels
    {
      id: '5',
      name: 'Backwater Retreat Alleppey',
      starRating: 4,
      priceRange: '₹6,000 - ₹10,000',
      pricePerNight: 8000,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/685753664.jpg?k=c1e6da5bd3124976066febf4a17d6c73bea02f7f6570d9251fdcb2e768e35181&o=',
      distance: '500m from Alleppey Backwaters',
      amenities: ['Wi-Fi', 'Houseboat', 'Ayurvedic Spa', 'Restaurant', 'Fishing'],
      location: 'Alleppey Backwaters',
      description: 'Serene backwater resort with traditional houseboats and Ayurvedic treatments.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Backwater+Retreat+Alleppey+Kerala&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.6,
      reviewCount: 1150
    },
    {
      id: '6',
      name: 'Munnar Tea Valley Resort',
      starRating: 5,
      priceRange: '₹12,000 - ₹18,000',
      pricePerNight: 15000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      distance: '2 km from Munnar Hill Station',
      amenities: ['Wi-Fi', 'Spa', 'Restaurant', 'Tea Plantation Tours', 'Trekking'],
      location: 'Munnar Hill Station',
      description: 'Luxury resort nestled in tea plantations with breathtaking mountain views.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Munnar+Tea+Valley+Resort+Kerala&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.7,
      reviewCount: 980
    },
    {
      id: '7',
      name: 'Kochi Heritage Hotel',
      starRating: 4,
      priceRange: '₹7,000 - ₹11,000',
      pricePerNight: 9000,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      distance: '800m from Kochi Fort',
      amenities: ['Wi-Fi', 'Pool', 'Restaurant', 'Heritage Tours', 'Parking'],
      location: 'Kochi Fort',
      description: 'Colonial-style heritage hotel near the historic Kochi Fort.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Kochi+Heritage+Hotel+Kerala&dest_type=hotel&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.4,
      reviewCount: 750
    },
    
    // Himachal Pradesh Hotels
    {
      id: '8',
      name: 'Manali Mountain Resort',
      starRating: 4,
      priceRange: '₹5,000 - ₹8,000',
      pricePerNight: 6500,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/714604248.jpg?k=13bb9e46c26dadaa687dc2363ac2bcc6073bc50975f4f363cb41601506021a5e&o=',
      distance: '1.5 km from Manali center',
      amenities: ['Wi-Fi', 'Restaurant', 'Adventure Sports', 'Parking', 'Room Service'],
      location: 'Manali',
      description: 'Adventure resort offering stunning mountain views and outdoor activities.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Manali+Mountain+Resort+Himachal+Pradesh&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.3,
      reviewCount: 890
    },
    {
      id: '9',
      name: 'Shimla Grand Hotel',
      starRating: 5,
      priceRange: '₹10,000 - ₹15,000',
      pricePerNight: 12500,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/537723299.webp?k=dbcca2ab2151962e8297f50c9a7cc63f95899abc9049561a78af8796b46e4df6&o=',
      distance: '500m from Shimla Mall Road',
      amenities: ['Wi-Fi', 'Spa', 'Restaurant', 'Bar', 'Heritage Architecture'],
      location: 'Shimla',
      description: 'Colonial-era grand hotel with panoramic Himalayan views.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Shimla+Grand+Hotel+Himachal+Pradesh&dest_type=hotel&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.6,
      reviewCount: 1200
    },
    {
      id: '10',
      name: 'Dharamshala Monastery Stay',
      starRating: 3,
      priceRange: '₹3,000 - ₹5,000',
      pricePerNight: 4000,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      distance: '1 km from Dharamshala monasteries',
      amenities: ['Wi-Fi', 'Restaurant', 'Meditation Center', 'Library'],
      location: 'Dharamshala',
      description: 'Peaceful retreat near Tibetan monasteries with spiritual ambiance.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Dharamshala+Monastery+Stay+Himachal+Pradesh&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.2,
      reviewCount: 560
    },
    
    // Goa Hotels
    {
      id: '11',
      name: 'Baga Beach Resort',
      starRating: 4,
      priceRange: '₹8,000 - ₹12,000',
      pricePerNight: 10000,
      image: 'https://r1imghtlak.mmtcdn.com/c87a76360e8711ec9c910a58a9feac02.jpg?output-quality=75&output-format=jpg&downsize=360:*',
      distance: '200m from Baga Beach',
      amenities: ['Wi-Fi', 'Pool', 'Beach Access', 'Restaurant', 'Water Sports'],
      location: 'Baga Beach',
      description: 'Beachfront resort with direct access to Baga Beach and water sports.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Baga+Beach+Resort+Goa&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.4,
      reviewCount: 1350
    },
    {
      id: '12',
      name: 'Old Goa Heritage Hotel',
      starRating: 3,
      priceRange: '₹4,000 - ₹7,000',
      pricePerNight: 5500,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      distance: '300m from Old Goa Churches',
      amenities: ['Wi-Fi', 'Restaurant', 'Heritage Tours', 'Parking'],
      location: 'Old Goa Churches',
      description: 'Heritage hotel near historic Portuguese churches and monuments.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Old+Goa+Heritage+Hotel&dest_type=hotel&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.1,
      reviewCount: 680
    },
    
    // Tamil Nadu Hotels
    {
      id: '13',
      name: 'Mahabalipuram Beach Resort',
      starRating: 4,
      priceRange: '₹7,500 - ₹12,000',
      pricePerNight: 9500,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/578683265.webp?k=73f063769bfc7b71be722b844c34f8684dd0b69894e40d80ea2616d4f4ffb2f9&o=',
      distance: '1 km from Mahabalipuram temples',
      amenities: ['Wi-Fi', 'Pool', 'Beach Access', 'Restaurant', 'Heritage Tours'],
      location: 'Mahabalipuram',
      description: 'Beachfront resort near ancient rock-cut temples and sculptures.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Mahabalipuram+Beach+Resort+Tamil+Nadu&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.5,
      reviewCount: 890
    },
    
    // Maharashtra Hotels
    {
      id: '14',
      name: 'Ajanta Heritage Hotel',
      starRating: 3,
      priceRange: '₹4,500 - ₹7,000',
      pricePerNight: 5500,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/609343836.webp?k=e54aaf13ec3d4e40f87b73c1f3a40f70ecf0ae2bc0706ca377854a12390e4377&o=',
      distance: '2 km from Ajanta Caves',
      amenities: ['Wi-Fi', 'Restaurant', 'Cave Tours', 'Parking'],
      location: 'Ajanta Caves',
      description: 'Comfortable hotel near the famous Buddhist cave monuments.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Ajanta+Heritage+Hotel+Maharashtra&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.2,
      reviewCount: 650
    },
    {
      id: '15',
      name: 'Lonavala Hill Resort',
      starRating: 4,
      priceRange: '₹6,000 - ₹9,000',
      pricePerNight: 7500,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/537723299.webp?k=dbcca2ab2151962e8297f50c9a7cc63f95899abc9049561a78af8796b46e4df6&o=',
      distance: '1.5 km from Lonavala center',
      amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Trekking'],
      location: 'Lonavala',
      description: 'Hill station resort with scenic valley views and waterfall access.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Lonavala+Hill+Resort+Maharashtra&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.3,
      reviewCount: 780
    },
    
    // Delhi Hotels
    {
      id: '16',
      name: 'Red Fort Heritage Hotel',
      starRating: 4,
      priceRange: '₹8,000 - ₹12,000',
      pricePerNight: 10000,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/672438427.webp?k=dd3ae568d0773a89682f9d27732a7c4bd60ae8ad62d4dd61b3b1ad4537e1687d&o=',
      distance: '500m from Red Fort',
      amenities: ['Wi-Fi', 'Restaurant', 'Heritage Tours', 'Business Center'],
      location: 'Red Fort',
      description: 'Heritage hotel in Old Delhi near the iconic Red Fort.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Red+Fort+Heritage+Hotel+Delhi&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.4,
      reviewCount: 920
    },
    {
      id: '17',
      name: 'India Gate Plaza Hotel',
      starRating: 5,
      priceRange: '₹12,000 - ₹18,000',
      pricePerNight: 15000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      distance: '300m from India Gate',
      amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym'],
      location: 'India Gate',
      description: 'Luxury hotel with views of India Gate and central Delhi location.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=India+Gate+Plaza+Hotel+Delhi&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.6,
      reviewCount: 1400
    },
    
    // Uttar Pradesh Hotels
    {
      id: '18',
      name: 'Taj View Hotel Agra',
      starRating: 5,
      priceRange: '₹15,000 - ₹25,000',
      pricePerNight: 20000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      distance: '1 km from Taj Mahal',
      amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Taj Views', 'Heritage Tours'],
      location: 'Taj Mahal',
      description: 'Luxury hotel with stunning views of the Taj Mahal.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Taj+View+Hotel+Agra+Uttar+Pradesh&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.8,
      reviewCount: 1800
    },
    {
      id: '19',
      name: 'Varanasi Ganga Hotel',
      starRating: 4,
      priceRange: '₹6,000 - ₹10,000',
      pricePerNight: 8000,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/283341985.webp?k=9521e0edaf29be12453679b4e8a08f398e3a2e61948369d91f9aa836242446e6&o=',
      distance: '200m from Varanasi Ghats',
      amenities: ['Wi-Fi', 'Restaurant', 'Ganga Views', 'Spiritual Tours'],
      location: 'Varanasi Ghats',
      description: 'Riverside hotel with direct access to the sacred Ganges ghats.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Varanasi+Ganga+Hotel+Uttar+Pradesh&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.5,
      reviewCount: 1100
    },
    
    // Jharkhand Hotels
    {
      id: '20',
      name: 'Hundru Falls Resort',
      starRating: 3,
      priceRange: '₹3,500 - ₹6,000',
      pricePerNight: 4500,
      image: 'data:image/jpeg;base64,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',
      distance: '1 km from Hundru Falls',
      amenities: ['Wi-Fi', 'Restaurant', 'Nature Walks', 'Parking'],
      location: 'Hundru Falls',
      description: 'Nature resort near the spectacular Hundru waterfall.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Hundru+Falls+Resort+Jharkhand&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.1,
      reviewCount: 480
    },
    {
      id: '21',
      name: 'Betla Wildlife Lodge',
      starRating: 3,
      priceRange: '₹4,000 - ₹7,000',
      pricePerNight: 5500,
      image: 'data:image/jpeg;base64,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',
      distance: '500m from Betla National Park',
      amenities: ['Wi-Fi', 'Restaurant', 'Safari Tours', 'Wildlife Viewing'],
      location: 'Betla National Park',
      description: 'Wildlife lodge offering safari experiences and nature immersion.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Betla+Wildlife+Lodge+Jharkhand&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.0,
      reviewCount: 320
    },
    
    // Sikkim Hotels
    {
      id: '22',
      name: 'Gangtok Mountain View Hotel',
      starRating: 4,
      priceRange: '₹7,000 - ₹11,000',
      pricePerNight: 9000,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/637025044.webp?k=cb79aa474ca0741bba050e2eaa38f01c9502b4c832fee0c0eb809a10549d0ab8&o=',
      distance: '1 km from Gangtok center',
      amenities: ['Wi-Fi', 'Restaurant', 'Mountain Views', 'Monastery Tours'],
      location: 'Gangtok',
      description: 'Mountain hotel with panoramic views of Kanchenjunga peaks.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Gangtok+Mountain+View+Hotel+Sikkim&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 4.4,
      reviewCount: 760
    },
    {
      id: '23',
      name: 'Nathula Pass Lodge',
      starRating: 2,
      priceRange: '₹2,500 - ₹4,500',
      pricePerNight: 3500,
      image: 'data:image/jpeg;base64,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',
      distance: '2 km from Nathula Pass',
      amenities: ['Wi-Fi', 'Restaurant', 'Border Views', 'Warm Clothing'],
      location: 'Nathula Pass',
      description: 'High-altitude lodge near the Indo-China border with mountain views.',
      bookingUrl: 'https://www.booking.com/searchresults.html?ss=Nathula+Pass+Lodge+Sikkim&dest_type=region&checkin_year=2024&checkin_month=12&checkin_monthday=15&checkout_year=2024&checkout_month=12&checkout_monthday=17&group_adults=2&no_rooms=1',
      rating: 3.8,
      reviewCount: 280
    }
  ];

  const availableAmenities = ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Room Service', 'Parking', 'Business Center'];

  useEffect(() => {
    // Get search query from URL params (when coming from ExplorePage)
    const urlParams = new URLSearchParams(location.search);
    const locationQuery = urlParams.get('location');
    if (locationQuery) {
      setSearchQuery(`${locationQuery}`);
    }
    
    setHotels(mockHotels);
    setFilteredHotels(mockHotels);
  }, [location]);

  useEffect(() => {
    // Apply filters
    let filtered = hotels.filter(hotel => {
      const matchesPrice = hotel.pricePerNight >= filters.priceRange[0] && hotel.pricePerNight <= filters.priceRange[1];
      const matchesRating = filters.starRating === 0 || hotel.starRating >= filters.starRating;
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity));
      const matchesSearch = searchQuery === '' || 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesPrice && matchesRating && matchesAmenities && matchesSearch;
    });

    setFilteredHotels(filtered);
  }, [hotels, filters, searchQuery]);

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 30000],
      starRating: 0,
      distance: 50,
      amenities: []
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaIcons.FaStar
        key={i}
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl max-w-3xl">Discover amazing hotels near your favorite destinations</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 -mt-8 relative z-20 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search hotels by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
            >
              <FaIcons.FaFilter />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (per night)</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="30000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600">₹0 - ₹{filters.priceRange[1].toLocaleString()}</div>
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Star Rating</label>
                  <select
                    value={filters.starRating}
                    onChange={(e) => setFilters(prev => ({ ...prev, starRating: parseInt(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={2}>2+ Stars</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>

                {/* Distance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance from Center</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={filters.distance}
                      onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600">Within {filters.distance} km</div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {availableAmenities.map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filters.amenities.includes(amenity)
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredHotels.length} of {hotels.length} hotels
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Hotel Image */}
              <div className="relative h-48">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
                  {renderStars(hotel.starRating)}
                </div>
              </div>

              {/* Hotel Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{hotel.name}</h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{hotel.priceRange}</div>
                    <div className="text-sm text-gray-600">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <FaIcons.FaMapMarkerAlt className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{hotel.distance}</span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center mr-2">
                    <FaIcons.FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({hotel.reviewCount} reviews)</span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{hotel.description}</p>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{hotel.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => window.open(hotel.bookingUrl, '_blank')}
                  className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <FaIcons.FaExternalLinkAlt className="text-sm" />
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <FaIcons.FaHotel className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No hotels found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HotelsPage;