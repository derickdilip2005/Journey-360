import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt, FaUsers, FaList, FaCalendarDay } from 'react-icons/fa';
import { MdEvent, MdFestival } from 'react-icons/md';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  entryFee: number;
  image: string;
  category: 'cultural' | 'eco-tourism' | 'fair' | 'workshop';
  capacity: number;
  registered: number;
  organizer: string;
  duration: string;
  highlights: string[];
}

const EventsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('2024-01');

  const events: Event[] = [
    {
      id: '1',
      title: 'Sarhul Festival Celebration',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'Ranchi, Jharkhand',
      description: 'Traditional tribal festival celebrating the worship of nature and trees',
      entryFee: 0,
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',
      category: 'cultural',
      capacity: 500,
      registered: 234,
      organizer: 'Jharkhand Cultural Society',
      duration: '3 days',
      highlights: ['Traditional dance', 'Folk music', 'Local cuisine', 'Cultural exhibitions']
    },
    {
      id: '2',
      title: 'Betla National Park Wildlife Safari',
      date: '2024-02-20',
      time: '06:00 AM',
      location: 'Betla National Park, Jharkhand',
      description: 'Early morning wildlife safari to spot tigers, elephants, and other wildlife',
      entryFee: 1200,
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=600',
      category: 'eco-tourism',
      capacity: 30,
      registered: 18,
      organizer: 'Eco Adventures Jharkhand',
      duration: '6 hours',
      highlights: ['Tiger spotting', 'Elephant sighting', 'Bird watching', 'Nature photography']
    },
    {
      id: '3',
      title: 'Tribal Handicrafts Fair',
      date: '2024-02-25',
      time: '10:00 AM',
      location: 'Dumka, Jharkhand',
      description: 'Annual fair showcasing authentic tribal handicrafts and artisan skills',
      entryFee: 50,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      category: 'fair',
      capacity: 1000,
      registered: 456,
      organizer: 'Tribal Arts Council',
      duration: '5 days',
      highlights: ['Live demonstrations', 'Craft workshops', 'Cultural performances', 'Shopping']
    },
    {
      id: '4',
      title: 'Traditional Cooking Workshop',
      date: '2024-03-05',
      time: '11:00 AM',
      location: 'Hazaribagh, Jharkhand',
      description: 'Learn to cook authentic Jharkhandi dishes with local ingredients',
      entryFee: 800,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
      category: 'workshop',
      capacity: 25,
      registered: 12,
      organizer: 'Culinary Heritage Foundation',
      duration: '4 hours',
      highlights: ['Hands-on cooking', 'Recipe sharing', 'Local ingredients', 'Cultural stories']
    },
    {
      id: '5',
      title: 'Karma Festival Dance Competition',
      date: '2024-04-10',
      time: '07:00 PM',
      location: 'Chaibasa, Jharkhand',
      description: 'Traditional dance competition celebrating the Karma festival',
      entryFee: 100,
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600',
      category: 'cultural',
      capacity: 800,
      registered: 345,
      organizer: 'Folk Dance Association',
      duration: '1 day',
      highlights: ['Dance performances', 'Live music', 'Prize distribution', 'Cultural exchange']
    },
    {
      id: '6',
      title: 'Eco-Tourism Photography Workshop',
      date: '2024-03-20',
      time: '05:30 AM',
      location: 'Hundru Falls, Jharkhand',
      description: 'Photography workshop focusing on nature and wildlife photography',
      entryFee: 1500,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600',
      category: 'eco-tourism',
      capacity: 20,
      registered: 8,
      organizer: 'Nature Photography Club',
      duration: '8 hours',
      highlights: ['Professional guidance', 'Equipment provided', 'Nature walks', 'Photo editing tips']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', icon: MdEvent },
    { id: 'cultural', name: 'Cultural', icon: MdFestival },
    { id: 'eco-tourism', name: 'Eco-Tourism', icon: FaMapMarkerAlt },
    { id: 'fair', name: 'Fairs', icon: FaUsers },
    { id: 'workshop', name: 'Workshops', icon: FaTicketAlt }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const handleRegister = (event: Event) => {
    if (event.registered >= event.capacity) {
      alert('Sorry, this event is fully booked!');
      return;
    }
    alert(`Registration successful for ${event.title}! You will receive a confirmation email shortly.`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural': return 'bg-purple-100 text-purple-800';
      case 'eco-tourism': return 'bg-green-100 text-green-800';
      case 'fair': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CalendarView = () => {
    const eventsByDate = filteredEvents.reduce((acc, event) => {
      const date = event.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(event);
      return acc;
    }, {} as Record<string, Event[]>);

    const daysInMonth = new Date(2024, 1, 0).getDate();
    const firstDay = new Date(2024, 0, 1).getDay();
    const days = Array.from({ length: daysInMonth + firstDay }, (_, i) => {
      if (i < firstDay) return null;
      const day = i - firstDay + 1;
      const dateString = `2024-01-${day.toString().padStart(2, '0')}`;
      return { day, dateString, events: eventsByDate[dateString] || [] };
    });

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div key={index} className="min-h-24 border border-gray-200 p-1">
              {day && (
                <>
                  <div className="font-medium text-sm mb-1">{day.day}</div>
                  {day.events.map(event => (
                    <div
                      key={event.id}
                      className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1 truncate"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ListView = () => (
    <div className="space-y-6">
      {filteredEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                </div>
                <div className="text-right">
                  {event.entryFee === 0 ? (
                    <div className="text-2xl font-bold text-green-600">Free</div>
                  ) : (
                    <div className="text-2xl font-bold text-orange-600">₹{event.entryFee}</div>
                  )}
                  <div className="text-gray-600">Entry Fee</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2 text-green-500" />
                  <span>{event.time} ({event.duration})</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-2 text-purple-500" />
                  <span>{event.registered}/{event.capacity} registered</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Event Highlights:</h4>
                <div className="flex flex-wrap gap-2">
                  {event.highlights.map((highlight, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Organized by: <span className="font-medium">{event.organizer}</span>
                </div>
                <button
                  onClick={() => handleRegister(event)}
                  disabled={event.registered >= event.capacity}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
                    event.registered >= event.capacity
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  <FaTicketAlt className="mr-2" />
                  {event.registered >= event.capacity ? 'Fully Booked' : 'Register / Book Ticket'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cultural Events & Activities
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover upcoming cultural events, fairs, and eco-tourism activities in Jharkhand
            </p>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          {/* View Toggle */}
          <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center px-4 py-2 font-medium transition-colors duration-300 ${
                viewMode === 'list'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaList className="mr-2" />
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center px-4 py-2 font-medium transition-colors duration-300 ${
                viewMode === 'calendar'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaCalendarDay className="mr-2" />
              Calendar View
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-300'
                  }`}
                >
                  <IconComponent className="mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {viewMode === 'calendar' ? <CalendarView /> : <ListView />}

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Event Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{events.length}</div>
              <div className="text-gray-600">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {events.filter(e => e.category === 'cultural').length}
              </div>
              <div className="text-gray-600">Cultural Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {events.reduce((sum, e) => sum + e.registered, 0)}
              </div>
              <div className="text-gray-600">Total Registrations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {events.filter(e => e.entryFee === 0).length}
              </div>
              <div className="text-gray-600">Free Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;