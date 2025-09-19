import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  MapIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  DocumentArrowUpIcon,
  PhotoIcon,
  LanguageIcon,
  AcademicCapIcon,
  StarIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface GuideProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  languages: string[];
  experience: number;
  specializations: string[];
  photo: string;
  idDocument: string;
  certificate: string;
  status: 'pending' | 'verified' | 'rejected';
  rating: number;
  totalBookings: number;
}

interface Booking {
  id: string;
  touristName: string;
  touristPhoto: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  description: string;
  specialRequests?: string;
}

const GuideDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [registrationStep, setRegistrationStep] = useState(1);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [calendarView, setCalendarView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [guideProfile] = useState<GuideProfile>({
    id: '1',
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    phone: '+91 9876543210',
    languages: ['English', 'Hindi', 'Gujarati'],
    experience: 5,
    specializations: ['Cultural Tours', 'Historical Sites', 'Food Tours'],
    photo: '/api/placeholder/100/100',
    idDocument: 'aadhar_card.pdf',
    certificate: 'tourism_guide_license.pdf',
    status: 'verified',
    rating: 4.8,
    totalBookings: 127
  });

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      touristName: 'Sarah Johnson',
      touristPhoto: '/api/placeholder/50/50',
      date: '2024-01-25',
      time: '09:00 AM',
      duration: '4 hours',
      location: 'Red Fort, Delhi',
      price: 2500,
      status: 'pending',
      description: 'Historical tour of Red Fort with cultural insights',
      specialRequests: 'Interested in Mughal architecture details'
    },
    {
      id: '2',
      touristName: 'Mike Chen',
      touristPhoto: '/api/placeholder/50/50',
      date: '2024-01-26',
      time: '02:00 PM',
      duration: '3 hours',
      location: 'India Gate, Delhi',
      price: 2000,
      status: 'accepted',
      description: 'Evening walk and photography session'
    },
    {
      id: '3',
      touristName: 'Emma Wilson',
      touristPhoto: '/api/placeholder/50/50',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: '6 hours',
      location: 'Old Delhi Food Tour',
      price: 3500,
      status: 'completed',
      description: 'Comprehensive food tour of Old Delhi markets'
    },
    {
      id: '4',
      touristName: 'David Brown',
      touristPhoto: '/api/placeholder/50/50',
      date: '2024-01-22',
      time: '11:00 AM',
      duration: '2 hours',
      location: 'Lotus Temple',
      price: 1500,
      status: 'rejected',
      description: 'Spiritual and architectural tour'
    }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserIcon },
    { id: 'registration', name: 'Registration', icon: AcademicCapIcon },
    { id: 'bookings', name: 'Bookings', icon: CalendarIcon },
    { id: 'calendar', name: 'Calendar', icon: MapIcon },
  ];

  const registrationSteps = [
    { id: 1, name: 'Personal Details', completed: true },
    { id: 2, name: 'Languages & Skills', completed: true },
    { id: 3, name: 'Experience', completed: true },
    { id: 4, name: 'Documents', completed: false },
  ];

  const handleAcceptBooking = (bookingId: string) => {
    console.log('Accepting booking:', bookingId);
  };

  const handleRejectBooking = (bookingId: string) => {
    console.log('Rejecting booking:', bookingId);
  };

  const handleChatWithTourist = (bookingId: string) => {
    console.log('Opening chat for booking:', bookingId);
  };

  const getBookingsByStatus = (status: string) => {
    return bookings.filter(booking => booking.status === status);
  };

  const totalEarnings = bookings
    .filter(booking => booking.status === 'completed')
    .reduce((sum, booking) => sum + booking.price, 0);

  const pendingEarnings = bookings
    .filter(booking => booking.status === 'accepted')
    .reduce((sum, booking) => sum + booking.price, 0);

  const renderRegistrationForm = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Progress Bar */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Guide Registration</h3>
          <span className="text-sm text-gray-500">Step {registrationStep} of 4</span>
        </div>
        <div className="flex items-center space-x-4">
          {registrationSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.id <= registrationStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.completed ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span className={`ml-2 text-sm ${
                step.id <= registrationStep ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.name}
              </span>
              {index < registrationSteps.length - 1 && (
                <div className={`w-8 h-0.5 ml-4 ${
                  step.id < registrationStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Personal Details */}
        {registrationStep === 1 && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Personal Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} placeholder="Enter your complete address"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Upload your profile photo</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800">Choose File</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Languages & Skills */}
        {registrationStep === 2 && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Languages & Specializations</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Languages Spoken</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia'].map((language) => (
                  <label key={language} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{language}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Specializations</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Cultural Tours', 'Historical Sites', 'Food Tours', 'Adventure Tours', 'Religious Sites', 'Photography Tours', 'Nature Walks', 'Shopping Tours', 'Nightlife Tours', 'Art & Craft Tours'].map((specialization) => (
                  <label key={specialization} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{specialization}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Operation</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} placeholder="List the cities/areas where you provide guide services"></textarea>
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {registrationStep === 3 && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Experience & Qualifications</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Less than 1 year</option>
                  <option>1-2 years</option>
                  <option>3-5 years</option>
                  <option>5-10 years</option>
                  <option>More than 10 years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>High School</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>Tourism/Hospitality Degree</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Previous Experience</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={4} placeholder="Describe your previous experience as a guide or in tourism industry"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to be a guide?</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} placeholder="Tell us about your motivation and passion for guiding tourists"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (₹)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter your preferred hourly rate" />
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {registrationStep === 4 && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Document Upload</h4>
            
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Government ID (Aadhar/Passport/Driving License)</span>
                  <span className="text-red-500 text-sm">Required</span>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <DocumentArrowUpIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Upload ID document</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">Choose File</button>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Tourism Guide License/Certificate</span>
                  <span className="text-yellow-500 text-sm">Optional</span>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <DocumentArrowUpIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Upload certificate</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">Choose File</button>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Educational Certificates</span>
                  <span className="text-yellow-500 text-sm">Optional</span>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <DocumentArrowUpIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Upload certificates</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">Choose File</button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Verification Process</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your documents will be reviewed within 2-3 business days</li>
                <li>• You'll receive an email notification once verification is complete</li>
                <li>• Verified guides get priority in booking recommendations</li>
                <li>• You can start receiving bookings immediately after verification</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setRegistrationStep(Math.max(1, registrationStep - 1))}
            disabled={registrationStep === 1}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          {registrationStep < 4 ? (
            <button
              onClick={() => setRegistrationStep(Math.min(4, registrationStep + 1))}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Submit Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookingCard = (booking: Booking) => (
    <div key={booking.id} className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start space-x-4">
        <img
          src={booking.touristPhoto}
          alt={booking.touristName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-gray-900">{booking.touristName}</h4>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              booking.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
              booking.status === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {booking.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm text-gray-600">
            <div>
              <span className="font-medium">Date:</span> {booking.date}
            </div>
            <div>
              <span className="font-medium">Time:</span> {booking.time}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {booking.duration}
            </div>
            <div>
              <span className="font-medium">Price:</span> ₹{booking.price}
            </div>
          </div>
          
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Location:</span> {booking.location}
          </p>
          <p className="text-gray-600 mb-3">{booking.description}</p>
          
          {booking.specialRequests && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Special Requests:</span> {booking.specialRequests}
              </p>
            </div>
          )}
          
          <div className="flex space-x-3">
            {booking.status === 'pending' && (
              <>
                <button
                  onClick={() => handleAcceptBooking(booking.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Accept
                </button>
                <button
                  onClick={() => handleRejectBooking(booking.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                >
                  <XCircleIcon className="w-4 h-4 mr-2" />
                  Reject
                </button>
              </>
            )}
            
            {(booking.status === 'accepted' || booking.status === 'completed') && (
              <button
                onClick={() => handleChatWithTourist(booking.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                Chat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guide Dashboard</h1>
          <p className="text-gray-600">Manage your profile, bookings, and earnings</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">₹{totalEarnings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CalendarIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{guideProfile.totalBookings}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <StarIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{guideProfile.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <ClockIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{getBookingsByStatus('pending').length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Status */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Status</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={guideProfile.photo}
                    alt={guideProfile.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900">{guideProfile.name}</h4>
                    <p className="text-gray-600">{guideProfile.specializations.join(', ')}</p>
                    <p className="text-gray-600">Languages: {guideProfile.languages.join(', ')}</p>
                    <p className="text-gray-600">Experience: {guideProfile.experience} years</p>
                  </div>
                  <div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      guideProfile.status === 'verified' ? 'bg-green-100 text-green-800' :
                      guideProfile.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {guideProfile.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                </div>
                <div className="p-6 space-y-4">
                  {bookings.slice(0, 3).map((booking) => renderBookingCard(booking))}
                </div>
              </div>
            </div>
          )}

          {/* Registration Tab */}
          {activeTab === 'registration' && (
            <div>
              {!showRegistrationForm ? (
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                  <AcademicCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Your Registration</h3>
                  <p className="text-gray-600 mb-6">Fill out your profile to start receiving bookings</p>
                  <button
                    onClick={() => setShowRegistrationForm(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Start Registration
                  </button>
                </div>
              ) : (
                renderRegistrationForm()
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {/* Booking Tabs */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8 px-6">
                    {['pending', 'accepted', 'rejected', 'completed'].map((status) => (
                      <button
                        key={status}
                        className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm capitalize"
                      >
                        {status} ({getBookingsByStatus(status).length})
                      </button>
                    ))}
                  </nav>
                </div>
                
                <div className="p-6 space-y-6">
                  {bookings.map((booking) => renderBookingCard(booking))}
                </div>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Booking Calendar</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      Month
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      Week
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      Day
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <p className="text-gray-500">Calendar Component (Integration with booking system)</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GuideDashboard;