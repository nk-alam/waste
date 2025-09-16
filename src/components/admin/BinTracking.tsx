import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFilter,
  FaSync,
  FaList,
  FaMap
} from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdLocationOn, MdSignalWifi3Bar, MdBattery3Bar } from 'react-icons/md';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Bin {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  fillLevel: number;
  status: 'empty' | 'low' | 'medium' | 'high' | 'full' | 'overflow' | 'maintenance';
  batteryLevel: number;
  signalStrength: number;
  lastUpdated: Date;
  capacity: number;
  type: 'general' | 'recyclable' | 'organic' | 'hazardous';
  sensorData: {
    temperature: number;
    humidity: number;
    weight: number;
  };
}

const BinTracking: React.FC = () => {
  const [bins, setBins] = useState<Bin[]>([]);
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<L.Map>(null);

  // Generate sample data
  useEffect(() => {
    generateSampleBins();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateBinData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateSampleBins = () => {
    const sampleBins: Bin[] = [
      {
        id: 'BIN001',
        name: 'City Center - Main Square',
        location: { lat: 28.6139, lng: 77.2090, address: 'Connaught Place, New Delhi' },
        fillLevel: 75,
        status: 'high',
        batteryLevel: 85,
        signalStrength: 90,
        lastUpdated: new Date(),
        capacity: 500,
        type: 'general',
        sensorData: { temperature: 28, humidity: 65, weight: 375 }
      },
      {
        id: 'BIN002',
        name: 'Recycling Center - Block A',
        location: { lat: 28.6127, lng: 77.2095, address: 'Janpath, New Delhi' },
        fillLevel: 45,
        status: 'medium',
        batteryLevel: 92,
        signalStrength: 75,
        lastUpdated: new Date(),
        capacity: 300,
        type: 'recyclable',
        sensorData: { temperature: 25, humidity: 58, weight: 135 }
      },
      {
        id: 'BIN003',
        name: 'Park Avenue - Organic Waste',
        location: { lat: 28.6145, lng: 77.2080, address: 'Khan Market, New Delhi' },
        fillLevel: 90,
        status: 'full',
        batteryLevel: 45,
        signalStrength: 60,
        lastUpdated: new Date(),
        capacity: 400,
        type: 'organic',
        sensorData: { temperature: 32, humidity: 78, weight: 360 }
      },
      {
        id: 'BIN004',
        name: 'Hospital Complex - Hazardous',
        location: { lat: 28.6155, lng: 77.2070, address: 'AIIMS, New Delhi' },
        fillLevel: 25,
        status: 'low',
        batteryLevel: 95,
        signalStrength: 85,
        lastUpdated: new Date(),
        capacity: 200,
        type: 'hazardous',
        sensorData: { temperature: 22, humidity: 45, weight: 50 }
      },
      {
        id: 'BIN005',
        name: 'Shopping Mall - Food Court',
        location: { lat: 28.6160, lng: 77.2100, address: 'Select City Walk, Delhi' },
        fillLevel: 100,
        status: 'overflow',
        batteryLevel: 70,
        signalStrength: 95,
        lastUpdated: new Date(),
        capacity: 600,
        type: 'general',
        sensorData: { temperature: 35, humidity: 82, weight: 650 }
      }
    ];
    setBins(sampleBins);
  };

  const updateBinData = () => {
    setBins(prevBins => 
      prevBins.map(bin => ({
        ...bin,
        fillLevel: Math.min(100, bin.fillLevel + Math.random() * 5 - 2),
        batteryLevel: Math.max(0, bin.batteryLevel - Math.random() * 2),
        signalStrength: Math.max(30, Math.min(100, bin.signalStrength + Math.random() * 10 - 5)),
        lastUpdated: new Date(),
        sensorData: {
          ...bin.sensorData,
          temperature: bin.sensorData.temperature + Math.random() * 4 - 2,
          humidity: Math.max(0, Math.min(100, bin.sensorData.humidity + Math.random() * 6 - 3)),
          weight: Math.max(0, bin.fillLevel * bin.capacity / 100)
        },
        status: bin.fillLevel >= 95 ? 'overflow' : 
               bin.fillLevel >= 80 ? 'full' :
               bin.fillLevel >= 60 ? 'high' :
               bin.fillLevel >= 30 ? 'medium' :
               bin.fillLevel >= 10 ? 'low' : 'empty'
      }))
    );
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateBinData();
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'empty': return 'text-gray-500';
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-orange-500';
      case 'full': return 'text-red-500';
      case 'overflow': return 'text-red-700';
      case 'maintenance': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overflow': return <FaExclamationTriangle className="h-4 w-4" />;
      case 'full': case 'high': return <FaTrash className="h-4 w-4" />;
      case 'empty': case 'low': return <FaCheckCircle className="h-4 w-4" />;
      default: return <FaTrash className="h-4 w-4" />;
    }
  };

  const createCustomIcon = (bin: Bin) => {
    const color = bin.status === 'overflow' ? '#dc2626' :
                 bin.status === 'full' ? '#ea580c' :
                 bin.status === 'high' ? '#f59e0b' :
                 bin.status === 'medium' ? '#eab308' :
                 bin.status === 'low' ? '#22c55e' : '#6b7280';
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      className: 'custom-bin-marker'
    });
  };

  const filteredBins = bins.filter(bin => {
    if (filter === 'all') return true;
    if (filter === 'alert') return ['overflow', 'full', 'maintenance'].includes(bin.status);
    return bin.status === filter;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Bin Tracking</h1>
        <p className="text-gray-600">Monitor waste bins with live IoT sensor data and GPS tracking</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Bins ({bins.length})</option>
              <option value="alert">Alert Status ({bins.filter(b => ['overflow', 'full'].includes(b.status)).length})</option>
              <option value="overflow">Overflow ({bins.filter(b => b.status === 'overflow').length})</option>
              <option value="full">Full ({bins.filter(b => b.status === 'full').length})</option>
              <option value="high">High ({bins.filter(b => b.status === 'high').length})</option>
              <option value="medium">Medium ({bins.filter(b => b.status === 'medium').length})</option>
              <option value="low">Low ({bins.filter(b => b.status === 'low').length})</option>
              <option value="empty">Empty ({bins.filter(b => b.status === 'empty').length})</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <FaMap className="inline mr-1" /> Map View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <FaList className="inline mr-1" /> List View
              </button>
            </div>
          </div>

          <button
            onClick={refreshData}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <FaSync className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-96 lg:h-[600px]">
                <MapContainer
                  ref={mapRef}
                  center={[28.6139, 77.2090]}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredBins.map((bin) => (
                    <Marker
                      key={bin.id}
                      position={[bin.location.lat, bin.location.lng]}
                      icon={createCustomIcon(bin)}
                      eventHandlers={{
                        click: () => setSelectedBin(bin)
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-sm">{bin.name}</h3>
                          <p className="text-xs text-gray-600 mb-2">{bin.location.address}</p>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span>Fill Level:</span>
                              <span className={`font-semibold ${getStatusColor(bin.status)}`}>
                                {bin.fillLevel.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Status:</span>
                              <span className={`font-semibold capitalize ${getStatusColor(bin.status)}`}>
                                {bin.status}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last Updated:</span>
                              <span>{bin.lastUpdated.toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Bin Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {selectedBin ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{selectedBin.name}</h3>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBin.status)} bg-gray-100`}>
                      {getStatusIcon(selectedBin.status)}
                      {selectedBin.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Fill Level */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Fill Level</span>
                        <span className="text-sm font-bold">{selectedBin.fillLevel.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            selectedBin.fillLevel >= 90 ? 'bg-red-500' :
                            selectedBin.fillLevel >= 70 ? 'bg-orange-500' :
                            selectedBin.fillLevel >= 50 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${selectedBin.fillLevel}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Battery & Signal */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MdBattery3Bar className="h-4 w-4 text-gray-600" />
                          <span className="text-xs font-medium text-gray-700">Battery</span>
                        </div>
                        <div className="text-sm font-bold">{selectedBin.batteryLevel}%</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MdSignalWifi3Bar className="h-4 w-4 text-gray-600" />
                          <span className="text-xs font-medium text-gray-700">Signal</span>
                        </div>
                        <div className="text-sm font-bold">{selectedBin.signalStrength}%</div>
                      </div>
                    </div>

                    {/* Sensor Data */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Sensor Data</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Temperature:</span>
                          <span className="text-xs font-medium">{selectedBin.sensorData.temperature.toFixed(1)}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Humidity:</span>
                          <span className="text-xs font-medium">{selectedBin.sensorData.humidity.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Weight:</span>
                          <span className="text-xs font-medium">{selectedBin.sensorData.weight.toFixed(1)} kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
                      <div className="text-xs text-gray-600">
                        <p>{selectedBin.location.address}</p>
                        <p className="mt-1">
                          {selectedBin.location.lat.toFixed(6)}, {selectedBin.location.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="text-xs text-gray-500 border-t pt-3">
                      Last updated: {selectedBin.lastUpdated.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FaMapMarkerAlt className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Select a bin on the map to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bin Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fill Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBins.map((bin) => (
                  <tr key={bin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bin.name}</div>
                        <div className="text-sm text-gray-500">{bin.id}</div>
                        <div className="text-xs text-gray-400">{bin.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bin.status)} bg-gray-100`}>
                        {getStatusIcon(bin.status)}
                        {bin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{bin.fillLevel.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              bin.fillLevel >= 90 ? 'bg-red-500' :
                              bin.fillLevel >= 70 ? 'bg-orange-500' :
                              bin.fillLevel >= 50 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${bin.fillLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bin.batteryLevel}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bin.signalStrength}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bin.lastUpdated.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedBin(bin)}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        View
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <BsThreeDotsVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinTracking;