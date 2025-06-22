'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  ShoppingCart, 
  Heart,
  Eye,
  Clock,
  Users,
  Award,
  Zap,
  Sparkles,
  Crown,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export default function ExclusiveStore() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Products', icon: Sparkles },
    { id: 'templates', name: 'Templates', icon: Download },
    { id: 'graphics', name: 'Graphics', icon: Eye },
    { id: 'fonts', name: 'Fonts', icon: TrendingUp },
    { id: 'icons', name: 'Icons', icon: Award },
    { id: 'mockups', name: 'Mockups', icon: Crown }
  ];

  const products = [
    {
      id: 1,
      title: 'Premium Logo Collection',
      category: 'templates',
      price: 49,
      originalPrice: 99,
      rating: 4.9,
      downloads: 1247,
      image: '/exclusive/logo-collection.jpg',
      tags: ['Logo', 'Branding', 'Vector'],
      featured: true
    },
    {
      id: 2,
      title: 'Social Media Kit Pro',
      category: 'graphics',
      price: 29,
      originalPrice: 59,
      rating: 4.8,
      downloads: 892,
      image: '/exclusive/social-kit.jpg',
      tags: ['Social Media', 'Marketing', 'Templates']
    },
    {
      id: 3,
      title: 'Modern Typography Bundle',
      category: 'fonts',
      price: 39,
      originalPrice: 79,
      rating: 4.7,
      downloads: 567,
      image: '/exclusive/typography.jpg',
      tags: ['Fonts', 'Typography', 'Modern']
    },
    {
      id: 4,
      title: 'UI/UX Design System',
      category: 'templates',
      price: 89,
      originalPrice: 149,
      rating: 4.9,
      downloads: 2341,
      image: '/exclusive/ui-system.jpg',
      tags: ['UI/UX', 'Design System', 'Figma']
    },
    {
      id: 5,
      title: 'Product Mockup Pack',
      category: 'mockups',
      price: 19,
      originalPrice: 39,
      rating: 4.6,
      downloads: 445,
      image: '/exclusive/mockups.jpg',
      tags: ['Mockups', 'Products', 'PSD']
    },
    {
      id: 6,
      title: 'Icon Set Premium',
      category: 'icons',
      price: 15,
      originalPrice: 29,
      rating: 4.8,
      downloads: 1234,
      image: '/exclusive/icons.jpg',
      tags: ['Icons', 'SVG', 'Vector']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { value: '500+', label: 'Premium Products', icon: Crown },
    { value: '10K+', label: 'Downloads', icon: Download },
    { value: '4.9', label: 'Average Rating', icon: Star },
    { value: '24/7', label: 'Support', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Crown className="h-8 w-8 text-yellow-400 mr-3" />
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                Exclusive Store
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Digital
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Assets
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Discover our exclusive collection of premium templates, graphics, fonts, and design resources 
              crafted by industry experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                <Eye className="mr-2 h-5 w-5" />
                Preview All
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-white/40" />
              <span className="text-white/60 text-sm">Filter by:</span>
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id 
                      ? "bg-purple-500 text-white" 
                      : "border-white/20 text-white hover:bg-white/10"
                    }
                  >
                    <category.icon className="h-3 w-3 mr-1" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hand-picked premium assets for designers, marketers, and creators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                  {product.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                        <Crown className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Eye className="h-16 w-16 text-white/40" />
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-purple-500/20 text-purple-400">
                        {categories.find(c => c.id === product.category)?.name}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white/60 text-sm">{product.rating}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-white text-lg font-semibold mb-2">
                      {product.title}
                    </CardTitle>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.map((tag) => (
                        <span key={tag} className="text-white/40 text-xs bg-white/5 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4 text-white/40" />
                        <span className="text-white/60 text-sm">{product.downloads} downloads</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-2xl font-bold">${product.price}</span>
                        <span className="text-white/40 line-through">${product.originalPrice}</span>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Elevate Your Designs?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of creators who trust our premium digital assets for their projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 