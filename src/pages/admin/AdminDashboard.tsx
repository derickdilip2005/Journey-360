import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  UserGroupIcon,
  MapIcon,
  BuildingStorefrontIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
  PencilIcon,
  ArrowTrendingUpIcon,
  UserIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';
import { Alert, AlertDescription } from '../../components/ui/alert';

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <MapIcon className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tourists" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Tourists
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <ShoppingBagIcon className="w-4 h-4" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <UserGroupIcon className="w-4 h-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <ExclamationTriangleIcon className="w-4 h-4" />
              Complaints
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <ChartBarIcon className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UserGroupIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Tourists</p>
                      <p className="text-2xl font-bold text-gray-900">1,234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BuildingStorefrontIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Marketplace Items</p>
                      <p className="text-2xl font-bold text-gray-900">567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Guides</p>
                      <p className="text-2xl font-bold text-gray-900">89</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Open Complaints</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tourist Monitoring Tab */}
          <TabsContent value="tourists" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tourist Activity Monitoring</CardTitle>
                <CardDescription>Real-time tracking of tourist locations and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tourist</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tourists.map((tourist) => (
                      <TableRow key={tourist.id}>
                        <TableCell className="font-medium">{tourist.name}</TableCell>
                        <TableCell>{tourist.location}</TableCell>
                        <TableCell>{tourist.lastActivity}</TableCell>
                        <TableCell>
                          <Badge variant={tourist.status === 'active' ? 'default' : 'secondary'}>
                            {tourist.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tourist Activity Map</CardTitle>
                <CardDescription>Heatmap of tourist check-ins and popular destinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Component (Google Maps API integration)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketplace Management Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketplace Items</CardTitle>
                <CardDescription>Manage handicrafts, homestays, and events</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketplaceItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.seller}</TableCell>
                        <TableCell>₹{item.price}</TableCell>
                        <TableCell>
                          <Badge variant={
                            item.status === 'approved' ? 'default' :
                            item.status === 'pending' ? 'secondary' :
                            'destructive'
                          }>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            onClick={() => handleApproveItem(item.id)}
                            variant="outline"
                            size="sm"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleRejectItem(item.id)}
                            variant="outline"
                            size="sm"
                          >
                            <XCircleIcon className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guide Applications Tab */}
          <TabsContent value="guides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guide Applications</CardTitle>
                <CardDescription>Review and approve guide registrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {guideApplications.map((guide) => (
                  <Card key={guide.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={guide.photo} alt={guide.name} />
                          <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{guide.name}</h4>
                            {guide.blockchainVerified && (
                              <Badge variant="secondary">
                                Blockchain Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">Experience: {guide.experience} years</p>
                          <p className="text-gray-600 mb-2">Languages: {guide.languages.join(', ')}</p>
                          <p className="text-gray-600 mb-4">Certificate: {guide.certificate}</p>
                          <div className="flex space-x-3">
                            <Button
                              onClick={() => handleApproveGuide(guide.id)}
                              variant="default"
                              size="sm"
                            >
                              <CheckCircleIcon className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleRejectGuide(guide.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <XCircleIcon className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complaints & Feedback</CardTitle>
                <CardDescription>Manage user complaints and issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">{complaint.ticketId}</TableCell>
                        <TableCell>{complaint.userName}</TableCell>
                        <TableCell>{complaint.category}</TableCell>
                        <TableCell className="max-w-xs truncate">{complaint.description}</TableCell>
                        <TableCell>
                          <Badge variant={
                            complaint.priority === 'high' ? 'destructive' :
                            complaint.priority === 'medium' ? 'secondary' :
                            'default'
                          }>
                            {complaint.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            complaint.status === 'open' ? 'destructive' :
                            complaint.status === 'assigned' ? 'secondary' :
                            'default'
                          }>
                            {complaint.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            onClick={() => handleAssignComplaint(complaint.id)}
                            variant="outline"
                            size="sm"
                          >
                            <ClockIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleResolveComplaint(complaint.id)}
                            variant="outline"
                            size="sm"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Positive</span>
                    <span className="text-sm font-medium text-green-600">{sentimentData.positive}%</span>
                  </div>
                  <Progress value={sentimentData.positive} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Neutral</span>
                    <span className="text-sm font-medium text-yellow-600">{sentimentData.neutral}%</span>
                  </div>
                  <Progress value={sentimentData.neutral} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Negative</span>
                    <span className="text-sm font-medium text-red-600">{sentimentData.negative}%</span>
                  </div>
                  <Progress value={sentimentData.negative} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-500">Line Chart Component (Sentiment trends over time)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="w-8 h-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                      <p className="text-2xl font-bold text-gray-900">92%</p>
                      <p className="text-sm text-green-600">+5% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <ChartBarIcon className="w-8 h-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-gray-900">2,847</p>
                      <p className="text-sm text-blue-600">+12% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="w-8 h-8 text-red-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Response Time</p>
                      <p className="text-2xl font-bold text-gray-900">2.4h</p>
                      <p className="text-sm text-red-600">-15% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;