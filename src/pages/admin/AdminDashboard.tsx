import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  UserIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

interface Tourist {
  id: string;
  name: string;
  location: string;
  lastActivity: string;
  status: 'active' | 'inactive';
}

interface MarketplaceItem {
  id: string;
  name: string;
  category: 'Handicraft' | 'Homestay' | 'Event';
  seller: string;
  price: number;
  status: 'approved' | 'pending' | 'rejected';
}

interface GuideApplication {
  id: string;
  name: string;
  photo: string;
  languages: string[];
  experience: number;
  certificate: string;
  blockchainVerified: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

interface Complaint {
  id: string;
  ticketId: string;
  userName: string;
  category: 'Marketplace' | 'Guide' | 'General';
  description: string;
  status: 'open' | 'assigned' | 'closed';
  priority: 'low' | 'medium' | 'high';
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tourists] = useState<Tourist[]>([
    { id: '1', name: 'John Doe', location: 'Mumbai', lastActivity: '2 hours ago', status: 'active' },
    { id: '2', name: 'Jane Smith', location: 'Delhi', lastActivity: '5 hours ago', status: 'active' },
    { id: '3', name: 'Mike Johnson', location: 'Goa', lastActivity: '1 day ago', status: 'inactive' },
  ]);

  const [marketplaceItems] = useState<MarketplaceItem[]>([
    { id: '1', name: 'Handwoven Silk Saree', category: 'Handicraft', seller: 'Rajesh Kumar', price: 2500, status: 'approved' },
    { id: '2', name: 'Heritage Homestay', category: 'Homestay', seller: 'Priya Sharma', price: 3000, status: 'pending' },
    { id: '3', name: 'Cultural Dance Show', category: 'Event', seller: 'Mumbai Events', price: 500, status: 'approved' },
  ]);

  const [guideApplications] = useState<GuideApplication[]>([
    {
      id: '1',
      name: 'Arjun Patel',
      photo: '/api/placeholder/64/64',
      languages: ['English', 'Hindi', 'Gujarati'],
      experience: 5,
      certificate: 'Tourism Guide License',
      blockchainVerified: true,
      status: 'pending'
    },
    {
      id: '2',
      name: 'Meera Singh',
      photo: '/api/placeholder/64/64',
      languages: ['English', 'Hindi', 'Punjabi'],
      experience: 3,
      certificate: 'Local Guide Certificate',
      blockchainVerified: false,
      status: 'pending'
    }
  ]);

  const [complaints] = useState<Complaint[]>([
    {
      id: '1',
      ticketId: 'TKT-001',
      userName: 'Sarah Wilson',
      category: 'Guide',
      description: 'Guide didn\'t show up for scheduled tour',
      status: 'open',
      priority: 'high'
    },
    {
      id: '2',
      ticketId: 'TKT-002',
      userName: 'David Brown',
      category: 'Marketplace',
      description: 'Product quality not as described',
      status: 'assigned',
      priority: 'medium'
    }
  ]);

  const sentimentData = {
    positive: 65,
    neutral: 25,
    negative: 10
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: MapIcon },
    { id: 'tourists', name: 'Tourist Monitoring', icon: UserIcon },
    { id: 'marketplace', name: 'Marketplace', icon: ShoppingBagIcon },
    { id: 'guides', name: 'Guide Applications', icon: UserGroupIcon },
    { id: 'complaints', name: 'Complaints', icon: ExclamationTriangleIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
  ];

  const handleApproveItem = (itemId: string) => {
    console.log('Approving item:', itemId);
  };

  const handleRejectItem = (itemId: string) => {
    console.log('Rejecting item:', itemId);
  };

  const handleApproveGuide = (guideId: string) => {
    console.log('Approving guide:', guideId);
  };

  const handleRejectGuide = (guideId: string) => {
    console.log('Rejecting guide:', guideId);
  };

  const handleAssignComplaint = (complaintId: string) => {
    console.log('Assigning complaint:', complaintId);
  };

  const handleResolveComplaint = (complaintId: string) => {
    console.log('Resolving complaint:', complaintId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your tourism platform</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserGroupIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Tourists</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BuildingStorefrontIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Marketplace Items</p>
                    <p className="text-2xl font-bold text-gray-900">567</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Guides</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Open Complaints</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tourist Monitoring Tab */}
          {activeTab === 'tourists' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Tourist Activity Map</h3>
                  <p className="text-gray-600">Heatmap of tourist check-ins and popular destinations</p>
                </div>
                <div className="p-6">
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-500">Interactive Map Component (Google Maps API integration)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Tourist Activities</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tourist</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tourists.map((tourist) => (
                        <tr key={tourist.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tourist.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tourist.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tourist.lastActivity}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              tourist.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {tourist.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Marketplace Management Tab */}
          {activeTab === 'marketplace' && (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Marketplace Items</h3>
                <p className="text-gray-600">Manage handicrafts, homestays, and events</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {marketplaceItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.seller}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === 'approved' ? 'bg-green-100 text-green-800' :
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleApproveItem(item.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircleIcon className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Guide Applications Tab */}
          {activeTab === 'guides' && (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Guide Applications</h3>
                <p className="text-gray-600">Review and approve guide registrations</p>
              </div>
              <div className="p-6 space-y-6">
                {guideApplications.map((guide) => (
                  <div key={guide.id} className="border rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={guide.photo}
                        alt={guide.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-semibold text-gray-900">{guide.name}</h4>
                          {guide.blockchainVerified && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Blockchain Verified
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">Experience: {guide.experience} years</p>
                        <p className="text-gray-600 mb-2">Languages: {guide.languages.join(', ')}</p>
                        <p className="text-gray-600 mb-4">Certificate: {guide.certificate}</p>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleApproveGuide(guide.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                          >
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectGuide(guide.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                          >
                            <XCircleIcon className="w-4 h-4 mr-2" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complaints Tab */}
          {activeTab === 'complaints' && (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Complaints & Feedback</h3>
                <p className="text-gray-600">Manage user complaints and issues</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {complaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.ticketId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.userName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{complaint.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                            complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            complaint.status === 'open' ? 'bg-red-100 text-red-800' :
                            complaint.status === 'assigned' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleAssignComplaint(complaint.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <ClockIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleResolveComplaint(complaint.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Positive</span>
                      <span className="text-sm font-medium text-green-600">{sentimentData.positive}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sentimentData.positive}%` }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Neutral</span>
                      <span className="text-sm font-medium text-yellow-600">{sentimentData.neutral}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${sentimentData.neutral}%` }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Negative</span>
                      <span className="text-sm font-medium text-red-600">{sentimentData.negative}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${sentimentData.negative}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Trends</h3>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-500">Line Chart Component (Sentiment trends over time)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="w-8 h-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                      <p className="text-2xl font-bold text-gray-900">92%</p>
                      <p className="text-sm text-green-600">+5% from last month</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <ChartBarIcon className="w-8 h-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-gray-900">2,847</p>
                      <p className="text-sm text-blue-600">+12% from last month</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="w-8 h-8 text-red-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Response Time</p>
                      <p className="text-2xl font-bold text-gray-900">2.4h</p>
                      <p className="text-sm text-red-600">-15% from last month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;