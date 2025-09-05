import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface ContentItem {
  id: number;
  title: string;
  type: 'spot' | 'event' | 'article';
  status: 'published' | 'draft';
  author: string;
  lastModified: string;
}

interface AnalyticsData {
  visitors: {
    total: number;
    change: number;
    data: number[];
  };
  pageViews: {
    total: number;
    change: number;
    data: number[];
  };
  topPages: {
    name: string;
    views: number;
  }[];
  userSources: {
    name: string;
    percentage: number;
  }[];
}

// Sample data
const users: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@jhar-tourism.com', role: 'Administrator', status: 'active', lastLogin: '2023-06-15 09:30 AM' },
  { id: 2, name: 'Content Manager', email: 'content@jhar-tourism.com', role: 'Editor', status: 'active', lastLogin: '2023-06-14 02:15 PM' },
  { id: 3, name: 'Guide Manager', email: 'guides@jhar-tourism.com', role: 'Manager', status: 'active', lastLogin: '2023-06-13 11:45 AM' },
  { id: 4, name: 'Support Staff', email: 'support@jhar-tourism.com', role: 'Support', status: 'inactive', lastLogin: '2023-05-30 10:20 AM' },
];

const contentItems: ContentItem[] = [
  { id: 1, title: 'Hundru Falls: Nature\'s Wonder', type: 'spot', status: 'published', author: 'Content Manager', lastModified: '2023-06-10' },
  { id: 2, title: 'Upcoming Tribal Festival in Ranchi', type: 'event', status: 'published', author: 'Content Manager', lastModified: '2023-06-12' },
  { id: 3, title: 'Best Street Food in Jamshedpur', type: 'article', status: 'draft', author: 'Support Staff', lastModified: '2023-06-14' },
  { id: 4, title: 'Wildlife Safari at Betla National Park', type: 'spot', status: 'published', author: 'Guide Manager', lastModified: '2023-06-08' },
  { id: 5, title: 'Monsoon Travel Tips for Jharkhand', type: 'article', status: 'draft', author: 'Content Manager', lastModified: '2023-06-15' },
];

const analyticsData: AnalyticsData = {
  visitors: {
    total: 12458,
    change: 8.5,
    data: [340, 380, 420, 450, 410, 480, 500, 520, 490, 540, 560, 580],
  },
  pageViews: {
    total: 38254,
    change: 12.3,
    data: [1200, 1300, 1400, 1350, 1500, 1600, 1550, 1700, 1800, 1750, 1900, 2000],
  },
  topPages: [
    { name: 'Home Page', views: 12540 },
    { name: 'Explore Page', views: 8320 },
    { name: 'Hundru Falls', views: 4560 },
    { name: 'Itinerary Planner', views: 3890 },
    { name: 'Cultural Experiences', views: 2780 },
  ],
  userSources: [
    { name: 'Organic Search', percentage: 45 },
    { name: 'Direct', percentage: 25 },
    { name: 'Social Media', percentage: 15 },
    { name: 'Referrals', percentage: 10 },
    { name: 'Others', percentage: 5 },
  ],
};

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'content' | 'spots' | 'feedback' | 'events'>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter content based on search term
  const filteredContent = contentItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen fixed">
          <div className="p-4">
            <h1 className="text-white text-xl font-bold mb-6">Admin Dashboard</h1>
            <nav>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center text-gray-300 py-3 px-4 rounded-lg mb-2 ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}
              >
                <FaIcons.FaChartBar className="mr-3" />
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center text-gray-300 py-3 px-4 rounded-lg mb-2 ${activeTab === 'users' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}
              >
                <FaIcons.FaUsers className="mr-3" />
                User Management
              </button>
              <button 
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center text-gray-300 py-3 px-4 rounded-lg mb-2 ${activeTab === 'content' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}
              >
                <FaIcons.FaNewspaper className="mr-3" />
                Content Management
              </button>
              <button 
                onClick={() => setActiveTab('spots')}
                className={`w-full flex items-center text-gray-300 py-3 px-4 rounded-lg mb-2 ${activeTab === 'spots' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}
              >
                <FaIcons.FaMapMarkedAlt className="mr-3" />
                Tourist Spots
              </button>
              <button 
                onClick={() => setActiveTab('feedback')}
                className={`w-full flex items-center text-gray-300 py-3 px-4 rounded-lg mb-2 ${activeTab === 'feedback' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}
              >
                <FaIcons.FaComments className="mr-3" />
                User Feedback
              </button>
              <button 
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center text-gray-300 py-3 px-4 rounded-lg mb-2 ${activeTab === 'events' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}
              >
                <FaIcons.FaCalendarAlt className="mr-3" />
                Events & Festivals
              </button>
            </nav>
          </div>
          <div className="absolute bottom-0 w-full p-4">
            <button className="w-full flex items-center justify-center text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-800">
              <FaIcons.FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-8">
          {/* Header with search */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'content' && 'Content Management'}
              {activeTab === 'spots' && 'Tourist Spots'}
              {activeTab === 'feedback' && 'User Feedback'}
              {activeTab === 'events' && 'Events & Festivals'}
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Dashboard content */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 mb-1">Total Visitors</p>
                      <h3 className="text-3xl font-bold">{analyticsData.visitors.total.toLocaleString()}</h3>
                    </div>
                    <div className={`text-sm font-medium ${analyticsData.visitors.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData.visitors.change >= 0 ? '+' : ''}{analyticsData.visitors.change}%
                    </div>
                  </div>
                  <div className="mt-4 h-16">
                    {/* Simple chart visualization */}
                    <div className="flex items-end h-full space-x-1">
                      {analyticsData.visitors.data.map((value, index) => (
                        <div 
                          key={index} 
                          className="bg-primary bg-opacity-70 rounded-sm" 
                          style={{ height: `${(value / Math.max(...analyticsData.visitors.data)) * 100}%`, width: '8%' }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 mb-1">Page Views</p>
                      <h3 className="text-3xl font-bold">{analyticsData.pageViews.total.toLocaleString()}</h3>
                    </div>
                    <div className={`text-sm font-medium ${analyticsData.pageViews.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData.pageViews.change >= 0 ? '+' : ''}{analyticsData.pageViews.change}%
                    </div>
                  </div>
                  <div className="mt-4 h-16">
                    {/* Simple chart visualization */}
                    <div className="flex items-end h-full space-x-1">
                      {analyticsData.pageViews.data.map((value, index) => (
                        <div 
                          key={index} 
                          className="bg-secondary bg-opacity-70 rounded-sm" 
                          style={{ height: `${(value / Math.max(...analyticsData.pageViews.data)) * 100}%`, width: '8%' }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div>
                    <p className="text-gray-500 mb-1">Active Users</p>
                    <h3 className="text-3xl font-bold">{users.filter(u => u.status === 'active').length}</h3>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Total Users: {users.length}</span>
                      <span className="text-primary font-medium">View All</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(users.filter(u => u.status === 'active').length / users.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div>
                    <p className="text-gray-500 mb-1">Published Content</p>
                    <h3 className="text-3xl font-bold">{contentItems.filter(c => c.status === 'published').length}</h3>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Total Content: {contentItems.length}</span>
                      <span className="text-primary font-medium">View All</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(contentItems.filter(c => c.status === 'published').length / contentItems.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts and tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
                  <div className="space-y-4">
                    {analyticsData.topPages.map((page, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{page.name}</span>
                            <span>{page.views.toLocaleString()} views</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${(page.views / analyticsData.topPages[0].views) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
                  <div className="space-y-4">
                    {analyticsData.userSources.map((source, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span>{source.name}</span>
                          <span className="font-medium">{source.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-tertiary' : 'bg-gray-500'}`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <FaIcons.FaUsers className="text-sm" />
                    </div>
                    <div>
                      <p className="font-medium">New user registered</p>
                      <p className="text-gray-500 text-sm">John Doe (john.doe@example.com) created an account</p>
                      <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <FaIcons.FaNewspaper className="text-sm" />
                    </div>
                    <div>
                      <p className="font-medium">Content published</p>
                      <p className="text-gray-500 text-sm">"Monsoon Travel Tips for Jharkhand" was published by Content Manager</p>
                      <p className="text-gray-400 text-xs mt-1">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <FaIcons.FaComments className="text-sm" />
                    </div>
                    <div>
                      <p className="font-medium">New feedback received</p>
                      <p className="text-gray-500 text-sm">A user submitted feedback about the Itinerary Planner feature</p>
                      <p className="text-gray-400 text-xs mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between mb-6">
                <div>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
                    <FaIcons.FaPlus className="mr-2" /> Add New User
                  </button>
                </div>
                <div className="flex space-x-2">
                  <select className="bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>All Roles</option>
                    <option>Administrator</option>
                    <option>Editor</option>
                    <option>Manager</option>
                    <option>Support</option>
                  </select>
                  <select className="bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{user.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <FaIcons.FaEye />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <FaIcons.FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <FaIcons.FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Content Management */}
          {activeTab === 'content' && (
            <div>
              <div className="flex justify-between mb-6">
                <div>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
                    <FaIcons.FaPlus className="mr-2" /> Add New Content
                  </button>
                </div>
                <div className="flex space-x-2">
                  <select className="bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>All Types</option>
                    <option>Tourist Spot</option>
                    <option>Event</option>
                    <option>Article</option>
                  </select>
                  <select className="bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Modified
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContent.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{item.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.type === 'spot' ? 'bg-blue-100 text-blue-800' : item.type === 'event' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {item.type === 'spot' ? 'Tourist Spot' : item.type === 'event' ? 'Event' : 'Article'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {item.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {item.lastModified}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <FaIcons.FaEye />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <FaIcons.FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <FaIcons.FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === 'spots' || activeTab === 'feedback' || activeTab === 'events') && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h3>
              <p className="text-gray-500 mb-6">This section is under development. Coming soon!</p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg">
                Explore {activeTab === 'spots' ? 'Tourist Spots' : activeTab === 'feedback' ? 'User Feedback' : 'Events & Festivals'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;