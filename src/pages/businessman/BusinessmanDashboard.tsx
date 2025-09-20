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
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';

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
    <Card>
      <CardHeader>
        <CardTitle>Register Your Business</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Business Type Selection */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Business Type</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['Handicraft', 'Homestay', 'Event Organizer'] as const).map((type) => (
              <Label key={type} className="relative">
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
              </Label>
            ))}
          </div>
        </div>

        {/* Dynamic Form Fields Based on Business Type */}
        <div className="space-y-6">
          {businessType === 'Handicraft' && (
            <>
              <div>
                <Label htmlFor="shopName">Shop Name</Label>
                <Input id="shopName" placeholder="Enter shop name" />
              </div>
              <div>
                <Label htmlFor="categories">Product Categories</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textiles">Textiles</SelectItem>
                    <SelectItem value="pottery">Pottery</SelectItem>
                    <SelectItem value="woodwork">Wood Work</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="paintings">Paintings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Product Images</Label>
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
                <Label htmlFor="propertyName">Property Name</Label>
                <Input id="propertyName" placeholder="Enter property name" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" rows={3} placeholder="Enter complete address" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rooms">Rooms Available</Label>
                  <Input id="rooms" type="number" placeholder="Number of rooms" />
                </div>
                <div>
                  <Label htmlFor="price">Price per Night</Label>
                  <Input id="price" type="number" placeholder="Price in ₹" />
                </div>
              </div>
              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['WiFi', 'AC', 'TV', 'Kitchen', 'Parking', 'Garden'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {businessType === 'Event Organizer' && (
            <>
              <div>
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" placeholder="Enter organization name" />
              </div>
              <div>
                <Label>Event Types</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Cultural Shows', 'Workshops', 'Tours', 'Festivals', 'Conferences', 'Exhibitions'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={type} />
                      <Label htmlFor={type} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Typical Event Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2hours">1-2 hours</SelectItem>
                      <SelectItem value="halfday">Half day</SelectItem>
                      <SelectItem value="fullday">Full day</SelectItem>
                      <SelectItem value="multipledays">Multiple days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" placeholder="Max participants" />
                </div>
              </div>
            </>
          )}

          {/* Common Fields */}
          <div>
            <Label>Upload Documents</Label>
            <div className="space-y-3">
              <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">GST Certificate</span>
                <Button variant="ghost" size="sm">
                  <DocumentArrowUpIcon className="w-5 h-5" />
                </Button>
              </div>
              <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">ID Proof</span>
                <Button variant="ghost" size="sm">
                  <DocumentArrowUpIcon className="w-5 h-5" />
                </Button>
              </div>
              <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Business License</span>
                <Button variant="ghost" size="sm">
                  <DocumentArrowUpIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowRegistrationForm(false)}
            >
              Cancel
            </Button>
            <Button>
              Submit Registration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderListingForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Add New Listing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter listing title" />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} placeholder="Describe your product/service" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="listingPrice">Price (₹)</Label>
            <Input id="listingPrice" type="number" placeholder="Enter price" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="textiles">Textiles</SelectItem>
                <SelectItem value="pottery">Pottery</SelectItem>
                <SelectItem value="woodwork">Wood Work</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stock">Stock/Availability</Label>
            <Input id="stock" type="number" placeholder="Available quantity" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Images</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Upload product images</p>
            <Button variant="ghost" className="mt-2">Choose Files</Button>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowListingForm(false)}
          >
            Cancel
          </Button>
          <Button>
            Save Listing
          </Button>
        </div>
      </CardContent>
    </Card>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center">
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <ClockIcon className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                        <p className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Listings</p>
                        <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <UserGroupIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Business Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Business Name: <span className="font-medium text-gray-900">{business.name}</span></p>
                      <p className="text-sm text-gray-600">Type: <span className="font-medium text-gray-900">{business.type}</span></p>
                      <p className="text-sm text-gray-600">Registration Date: <span className="font-medium text-gray-900">{business.registrationDate}</span></p>
                    </div>
                    <div>
                      <Badge variant={
                        business.status === 'approved' ? 'default' :
                        business.status === 'pending' ? 'secondary' :
                        'destructive'
                      }>
                        {business.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Registration Tab */}
            <TabsContent value="registration">
              {!showRegistrationForm ? (
                <Card className="text-center">
                  <CardContent className="p-6">
                    <BuildingStorefrontIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <CardTitle className="mb-2">Register Your Business</CardTitle>
                    <p className="text-gray-600 mb-6">Start by registering your business to begin selling on our platform</p>
                    <Button
                      onClick={() => setShowRegistrationForm(true)}
                      className="flex items-center mx-auto"
                    >
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Register Business
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                renderBusinessRegistrationForm()
              )}
            </TabsContent>

            {/* Listings Tab */}
            <TabsContent value="listings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Product Listings</h3>
                <Button
                  onClick={() => setShowListingForm(true)}
                  className="flex items-center"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add New Listing
                </Button>
              </div>

              {showListingForm && (
                <div className="mb-6">
                  {renderListingForm()}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{listing.title}</h4>
                        <Badge variant={
                          listing.status === 'published' ? 'default' :
                          listing.status === 'draft' ? 'secondary' :
                          'outline'
                        }>
                          {listing.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{listing.description}</p>
                      <p className="text-lg font-bold text-gray-900 mb-2">₹{listing.price}</p>
                      <p className="text-sm text-gray-500 mb-4">Stock: {listing.stock}</p>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditListing(listing.id)}
                          className="flex-1"
                        >
                          <PencilIcon className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        {listing.status === 'draft' && (
                          <Button
                            size="sm"
                            onClick={() => handlePublishListing(listing.id)}
                            className="flex-1"
                          >
                            Publish
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteListing(listing.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                <Button
                  onClick={handleExportTransactions}
                  className="flex items-center"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Export
                </Button>
              </div>

              {/* Payout Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Available Balance</h4>
                    <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Pending Clearance</h4>
                    <p className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Total Earnings</h4>
                    <p className="text-2xl font-bold text-blue-600">₹{(totalRevenue + pendingAmount).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Transactions Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.orderId}</TableCell>
                          <TableCell>{transaction.buyer}</TableCell>
                          <TableCell>{transaction.product}</TableCell>
                          <TableCell>₹{transaction.amount}</TableCell>
                          <TableCell>
                            <Badge variant={
                              transaction.status === 'paid' ? 'default' :
                              transaction.status === 'pending' ? 'secondary' :
                              'destructive'
                            }>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessmanDashboard;