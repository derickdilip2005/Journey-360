import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BuildingStorefrontIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentArrowUpIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowDownTrayIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Business {
  id: string;
  name: string;
  type: 'Handicraft' | 'Homestay' | 'Event Organizer';
  status: 'pending' | 'approved' | 'rejected';
  registrationDate: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: 'draft' | 'published' | 'sold';
  images: string[];
  stock?: number;
  availability?: string;
}

interface Transaction {
  id: string;
  orderId: string;
  buyer: string;
  product: string;
  amount: number;
  status: 'paid' | 'pending' | 'refunded';
  date: string;
}

const BusinessmanDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [businessType, setBusinessType] = useState<'Handicraft' | 'Homestay' | 'Event Organizer'>('Handicraft');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showListingForm, setShowListingForm] = useState(false);

  const [business] = useState<Business>({
    id: '1',
    name: 'Rajasthani Crafts',
    type: 'Handicraft',
    status: 'approved',
    registrationDate: '2024-01-15'
  });

  const [listings] = useState<Listing[]>([
    {
      id: '1',
      title: 'Handwoven Silk Saree',
      description: 'Beautiful traditional silk saree with intricate patterns',
      price: 2500,
      category: 'Textiles',
      status: 'published',
      images: ['/api/placeholder/200/200'],
      stock: 5
    },
    {
      id: '2',
      title: 'Wooden Handicraft Set',
      description: 'Set of 3 wooden decorative items',
      price: 1200,
      category: 'Wood Work',
      status: 'published',
      images: ['/api/placeholder/200/200'],
      stock: 12
    },
    {
      id: '3',
      title: 'Pottery Collection',
      description: 'Traditional clay pottery items',
      price: 800,
      category: 'Pottery',
      status: 'draft',
      images: ['/api/placeholder/200/200'],
      stock: 8
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      orderId: 'ORD-001',
      buyer: 'John Doe',
      product: 'Handwoven Silk Saree',
      amount: 2500,
      status: 'paid',
      date: '2024-01-20'
    },
    {
      id: '2',
      orderId: 'ORD-002',
      buyer: 'Jane Smith',
      product: 'Wooden Handicraft Set',
      amount: 1200,
      status: 'pending',
      date: '2024-01-19'
    },
    {
      id: '3',
      orderId: 'ORD-003',
      buyer: 'Mike Johnson',
      product: 'Pottery Collection',
      amount: 800,
      status: 'paid',
      date: '2024-01-18'
    }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'registration', name: 'Business Registration', icon: BuildingStorefrontIcon },
    { id: 'listings', name: 'Product Listings', icon: ClipboardDocumentListIcon },
    { id: 'transactions', name: 'Transactions', icon: CurrencyRupeeIcon },
  ];

  const totalRevenue = transactions.reduce((sum, transaction) => 
    transaction.status === 'paid' ? sum + transaction.amount : sum, 0
  );

  const pendingAmount = transactions.reduce((sum, transaction) => 
    transaction.status === 'pending' ? sum + transaction.amount : sum, 0
  );

  const handleDeleteListing = (listingId: string) => {
    console.log('Deleting listing:', listingId);
  };

  const handleEditListing = (listingId: string) => {
    console.log('Editing listing:', listingId);
  };

  const handlePublishListing = (listingId: string) => {
    console.log('Publishing listing:', listingId);
  };

  const handleExportTransactions = () => {
    console.log('Exporting transactions');
  };

  const renderBusinessRegistrationForm = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Register Your Business</h3>
      
      {/* Business Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Business Type</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['Handicraft', 'Homestay', 'Event Organizer'] as const).map((type) => (
            <label key={type} className="relative">
              <input
                type="radio"
                name="businessType"
                value={type}
                checked={businessType === type}
                onChange={(e) => setBusinessType(e.target.value as typeof businessType)}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                businessType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {type === 'Handicraft' && '🎨'}
                    {type === 'Homestay' && '🏠'}
                    {type === 'Event Organizer' && '🎉'}
                  </div>
                  <div className="font-medium text-gray-900">{type}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Form Fields Based on Business Type */}
      <div className="space-y-6">
        {businessType === 'Handicraft' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter shop name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories</label>
              <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32">
                <option>Textiles</option>
                <option>Pottery</option>
                <option>Wood Work</option>
                <option>Jewelry</option>
                <option>Paintings</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Upload product images</p>
              </div>
            </div>
          </>
        )}

        {businessType === 'Homestay' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter property name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} placeholder="Enter complete address"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rooms Available</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Number of rooms" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Price in ₹" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['WiFi', 'AC', 'TV', 'Kitchen', 'Parking', 'Garden'].map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {businessType === 'Event Organizer' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter organization name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Types</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Cultural Shows', 'Workshops', 'Tours', 'Festivals', 'Conferences', 'Exhibitions'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Typical Event Duration</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>1-2 hours</option>
                  <option>Half day</option>
                  <option>Full day</option>
                  <option>Multiple days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Max participants" />
              </div>
            </div>
          </>
        )}

        {/* Common Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
          <div className="space-y-3">
            <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">GST Certificate</span>
              <button className="text-blue-600 hover:text-blue-800">
                <DocumentArrowUpIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">ID Proof</span>
              <button className="text-blue-600 hover:text-blue-800">
                <DocumentArrowUpIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Business License</span>
              <button className="text-blue-600 hover:text-blue-800">
                <DocumentArrowUpIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowRegistrationForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit Registration
          </button>
        </div>
      </div>
    </div>
  );

  const renderListingForm = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Add New Listing</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter listing title" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={4} placeholder="Describe your product/service"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter price" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>Textiles</option>
              <option>Pottery</option>
              <option>Wood Work</option>
              <option>Jewelry</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock/Availability</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Available quantity" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Upload product images</p>
            <button className="mt-2 text-blue-600 hover:text-blue-800">Choose Files</button>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowListingForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Listing
          </button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h1>
          <p className="text-gray-600">Manage your business, listings, and transactions</p>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <ClockIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                      <p className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Listings</p>
                      <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <UserGroupIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Status */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Status</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Business Name: <span className="font-medium text-gray-900">{business.name}</span></p>
                    <p className="text-sm text-gray-600">Type: <span className="font-medium text-gray-900">{business.type}</span></p>
                    <p className="text-sm text-gray-600">Registration Date: <span className="font-medium text-gray-900">{business.registrationDate}</span></p>
                  </div>
                  <div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      business.status === 'approved' ? 'bg-green-100 text-green-800' :
                      business.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {business.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registration Tab */}
          {activeTab === 'registration' && (
            <div>
              {!showRegistrationForm ? (
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                  <BuildingStorefrontIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Register Your Business</h3>
                  <p className="text-gray-600 mb-6">Start by registering your business to begin selling on our platform</p>
                  <button
                    onClick={() => setShowRegistrationForm(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                  >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Register Business
                  </button>
                </div>
              ) : (
                renderBusinessRegistrationForm()
              )}
            </div>
          )}

          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Product Listings</h3>
                <button
                  onClick={() => setShowListingForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add New Listing
                </button>
              </div>

              {showListingForm && (
                <div className="mb-6">
                  {renderListingForm()}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{listing.title}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          listing.status === 'published' ? 'bg-green-100 text-green-800' :
                          listing.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{listing.description}</p>
                      <p className="text-lg font-bold text-gray-900 mb-2">₹{listing.price}</p>
                      <p className="text-sm text-gray-500 mb-4">Stock: {listing.stock}</p>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditListing(listing.id)}
                          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center"
                        >
                          <PencilIcon className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        {listing.status === 'draft' && (
                          <button
                            onClick={() => handlePublishListing(listing.id)}
                            className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                <button
                  onClick={handleExportTransactions}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Export
                </button>
              </div>

              {/* Payout Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Available Balance</h4>
                  <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Pending Clearance</h4>
                  <p className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Total Earnings</h4>
                  <p className="text-2xl font-bold text-blue-600">₹{(totalRevenue + pendingAmount).toLocaleString()}</p>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.orderId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.buyer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.product}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{transaction.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === 'paid' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessmanDashboard;