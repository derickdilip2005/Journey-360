import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaCreditCard, FaShieldAlt, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  seller: {
    name: string;
    location: string;
    rating: number;
    verified: boolean;
  };
  category: string;
  inStock: boolean;
}

const HandicraftsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: '1',
      name: 'Tribal Silver Jewelry Set',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      description: 'Authentic tribal silver jewelry handcrafted by local artisans',
      seller: {
        name: 'Sita Devi',
        location: 'Ranchi, Jharkhand',
        rating: 4.8,
        verified: true
      },
      category: 'jewelry',
      inStock: true
    },
    {
      id: '2',
      name: 'Handwoven Tussar Silk Saree',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
      description: 'Beautiful handwoven Tussar silk saree with traditional motifs',
      seller: {
        name: 'Kamla Weaving Co-op',
        location: 'Dumka, Jharkhand',
        rating: 4.9,
        verified: true
      },
      category: 'textiles',
      inStock: true
    },
    {
      id: '3',
      name: 'Bamboo Craft Home Decor Set',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      description: 'Eco-friendly bamboo craft items for home decoration',
      seller: {
        name: 'Ravi Kumar',
        location: 'Hazaribagh, Jharkhand',
        rating: 4.6,
        verified: true
      },
      category: 'crafts',
      inStock: true
    },
    {
      id: '4',
      name: 'Traditional Dokra Art Figurine',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      description: 'Ancient Dokra metal casting art piece depicting tribal life',
      seller: {
        name: 'Tribal Art Collective',
        location: 'Chaibasa, Jharkhand',
        rating: 4.7,
        verified: true
      },
      category: 'art',
      inStock: true
    },
    {
      id: '5',
      name: 'Handmade Pottery Collection',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400',
      description: 'Traditional pottery made with local clay and techniques',
      seller: {
        name: 'Pottery Masters Guild',
        location: 'Jamshedpur, Jharkhand',
        rating: 4.5,
        verified: true
      },
      category: 'pottery',
      inStock: false
    },
    {
      id: '6',
      name: 'Tribal Mask Collection',
      price: 2800,
      image: 'https://images.unsplash.com/photo-1544967882-6abec37be0c4?w=400',
      description: 'Authentic tribal masks used in traditional ceremonies',
      seller: {
        name: 'Cultural Heritage Store',
        location: 'Ranchi, Jharkhand',
        rating: 4.8,
        verified: true
      },
      category: 'art',
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'textiles', name: 'Textiles' },
    { id: 'crafts', name: 'Crafts' },
    { id: 'art', name: 'Art' },
    { id: 'pottery', name: 'Pottery' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const handleBuyNow = (product: Product) => {
    // Simulate payment integration (Razorpay/Stripe)
    alert(`Redirecting to payment gateway for ${product.name} - ₹${product.price}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Jharkhand Handicrafts
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover authentic tribal and local products crafted by skilled artisans
            </p>
            <div className="flex items-center justify-center space-x-6 text-lg">
              <div className="flex items-center">
                <MdVerified className="mr-2" />
                Verified Sellers
              </div>
              <div className="flex items-center">
                <FaShieldAlt className="mr-2" />
                Secure Payments
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="lg"
              className={selectedCategory === category.id ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Badge variant="secondary" className="text-lg">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="mb-4">{product.description}</CardDescription>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                    {product.inStock && (
                      <Badge variant="outline" className="text-green-600 border-green-600">In Stock</Badge>
                    )}
                  </div>

                  {/* Seller Info */}
                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{product.seller.name}</span>
                        {product.seller.verified && (
                          <MdVerified className="ml-2 text-blue-500" title="Verified Seller" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-gray-700">{product.seller.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-1" />
                      <span className="text-sm">{product.seller.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      variant="outline"
                      className="flex-1"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleBuyNow(product)}
                      disabled={!product.inStock}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      <FaCreditCard className="mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <Card className="mt-16 p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Why Choose Our Marketplace?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <MdVerified className="text-4xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Sellers</h3>
                <p className="text-gray-600">
                  All our sellers are verified through thorough background checks and authentication
                </p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-4xl text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600">
                  Safe and secure payment processing with multiple payment options
                </p>
              </div>
              <div className="text-center">
                <FaStar className="text-4xl text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-gray-600">
                  Authentic products with quality guarantee and customer reviews
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HandicraftsPage;