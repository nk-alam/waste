import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiShoppingCart,
  FiPackage,
  FiTruck,
  FiMapPin,
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit,
  FiTrash,
  FiEye,
  FiStar,
  FiHeart,
  FiAward,
  FiCheckCircle
} from 'react-icons/fi';
import {
  HiOutlineShoppingBag,
  HiOutlineLocationMarker,
  HiOutlineClock
} from 'react-icons/hi';

// Types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tools' | 'bags' | 'containers' | 'education';
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  eco_friendly: boolean;
}

interface Order {
  id: string;
  orderId: string;
  customerId: string;
  productName: string;
  quantity: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
}

interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  acceptedMaterials: string[];
  operatingHours: string;
  contact: string;
  rating: number;
  distance: string;
  coordinates: [number, number];
}

const ShopAndMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shop' | 'orders' | 'centers'>('shop');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Sample data
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Eco-Friendly Waste Bags',
      description: 'Biodegradable waste bags made from recycled materials',
      price: 25.99,
      category: 'bags',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      inStock: true,
      rating: 4.5,
      reviews: 128,
      eco_friendly: true
    },
    {
      id: '2',
      name: 'Smart Recycling Bin',
      description: 'IoT-enabled smart bin with automatic sorting capabilities',
      price: 299.99,
      category: 'containers',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=300&fit=crop',
      inStock: true,
      rating: 4.8,
      reviews: 89,
      eco_friendly: true
    },
    {
      id: '3',
      name: 'Waste Management Toolkit',
      description: 'Complete toolkit for waste management professionals',
      price: 89.99,
      category: 'tools',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=300&h=300&fit=crop',
      inStock: false,
      rating: 4.3,
      reviews: 45,
      eco_friendly: false
    }
  ]);

  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderId: 'ORD-001',
      customerId: 'CUST-001',
      productName: 'Eco-Friendly Waste Bags',
      quantity: 2,
      total: 51.98,
      status: 'delivered',
      orderDate: '2024-01-15',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: '2',
      orderId: 'ORD-002',
      customerId: 'CUST-002',
      productName: 'Smart Recycling Bin',
      quantity: 1,
      total: 299.99,
      status: 'processing',
      orderDate: '2024-01-16',
      estimatedDelivery: '2024-01-20'
    }
  ]);

  const [recyclingCenters] = useState<RecyclingCenter[]>([
    {
      id: '1',
      name: 'Green Earth Recycling',
      address: '123 Eco Street, Green City',
      acceptedMaterials: ['Plastic', 'Paper', 'Glass', 'Metal'],
      operatingHours: '8:00 AM - 6:00 PM',
      contact: '+1 234-567-8900',
      rating: 4.6,
      distance: '2.3 km',
      coordinates: [40.7128, -74.0060]
    },
    {
      id: '2',
      name: 'EcoMax Waste Solutions',
      address: '456 Recycle Ave, Clean Town',
      acceptedMaterials: ['Electronic Waste', 'Batteries', 'Plastic'],
      operatingHours: '9:00 AM - 5:00 PM',
      contact: '+1 234-567-8901',
      rating: 4.8,
      distance: '3.7 km',
      coordinates: [40.7589, -73.9851]
    }
  ]);

  // Filter functions
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStock = filterStatus === 'all' ||
      (filterStatus === 'in_stock' && product.inStock) ||
      (filterStatus === 'out_of_stock' && !product.inStock);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredCenters = recyclingCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Shop & Marketplace</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'shop'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FiShoppingCart className="inline mr-2" />
            Shop
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FiPackage className="inline mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('centers')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'centers'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FiMapPin className="inline mr-2" />
            Recycling Centers
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {activeTab === 'shop' && (
          <>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              <option value="tools">Tools</option>
              <option value="bags">Bags</option>
              <option value="containers">Containers</option>
              <option value="education">Education</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Stock</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </>
        )}

        {activeTab === 'orders' && (
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        )}

        {activeTab === 'shop' && (
          <button
            onClick={() => setShowAddProduct(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiPlus className="inline mr-2" />
            Add Product
          </button>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.eco_friendly && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    <FiCheckCircle className="inline mr-1" />
                    Eco-Friendly
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-green-600">${product.price}</span>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    disabled={!product.inStock}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiShoppingCart className="inline mr-2" />
                    Add to Cart
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiHeart className="text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FiEye />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <FiEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash />
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

      {activeTab === 'centers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCenters.map((center) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{center.name}</h3>
                  <div className="flex items-center text-gray-600 mb-1">
                    <HiOutlineLocationMarker className="mr-2" />
                    <span className="text-sm">{center.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <HiOutlineClock className="mr-2" />
                    <span className="text-sm">{center.operatingHours}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{center.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{center.distance}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Accepted Materials:</h4>
                <div className="flex flex-wrap gap-2">
                  {center.acceptedMaterials.map((material, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{center.contact}</span>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    <FiMapPin className="inline mr-1" />
                    Get Directions
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Product Modal (placeholder) */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <p className="text-gray-600 mb-4">Product form would go here...</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddProduct(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopAndMarketplace;