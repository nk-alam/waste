import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import {
  FaTruck,
  FaRoute,
  FaGasPump,
  FaUserClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSync,
  FaFilter,
  FaPlay,
  FaPause,
  FaStop
} from 'react-icons/fa';
import { BsSpeedometer2, BsThreeDotsVertical } from 'react-icons/bs';
import { MdGpsFixed, MdSchedule, MdLocalGasStation } from 'react-icons/md';
import 'leaflet/dist/leaflet.css';

interface Vehicle {
  id: string;
  name: string;
  driverName: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'idle' | 'maintenance' | 'offline';
  speed: number;
  fuelLevel: number;
  route: Array<{ lat: number; lng: number }>;
  assignedBins: string[];
  collectedBins: string[];
  capacity: number;
  currentLoad: number;
  lastUpdated: Date;
  workingHours: {
    start: string;
    end: string;
  };
  efficiency: number;
  totalDistance: number;
  estimatedArrival?: Date;
}

interface RouteStop {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  type: 'bin' | 'facility' | 'depot';
  status: 'pending' | 'completed' | 'current';
  estimatedTime: Date;
  actualTime?: Date;
}

const VehicleTracking: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [routeStops, setRouteStops] = useState<RouteStop[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<L.Map>(null);

  // Generate sample data
  useEffect(() => {
    generateSampleVehicles();
    generateSampleRoute();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateVehiclePositions();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateSampleVehicles = () => {
    const sampleVehicles: Vehicle[] = [
      {
        id: 'VEH001',
        name: 'Waste Truck Alpha',
        driverName: 'Rajesh Kumar',
        location: { lat: 28.6139, lng: 77.2090 },
        status: 'active',
        speed: 35,
        fuelLevel: 75,
        route: [
          { lat: 28.6139, lng: 77.2090 },
          { lat: 28.6150, lng: 77.2100 },
          { lat: 28.6160, lng: 77.2110 },
          { lat: 28.6170, lng: 77.2120 }
        ],
        assignedBins: ['BIN001', 'BIN002', 'BIN003'],
        collectedBins: ['BIN001'],
        capacity: 5000,
        currentLoad: 2500,
        lastUpdated: new Date(),
        workingHours: { start: '06:00', end: '14:00' },
        efficiency: 92,
        totalDistance: 45.2
      },
      {
        id: 'VEH002',
        name: 'Recycling Truck Beta',
        driverName: 'Priya Sharma',
        location: { lat: 28.6180, lng: 77.2130 },
        status: 'active',
        speed: 28,
        fuelLevel: 60,
        route: [
          { lat: 28.6180, lng: 77.2130 },
          { lat: 28.6190, lng: 77.2140 },
          { lat: 28.6200, lng: 77.2150 }
        ],
        assignedBins: ['BIN004', 'BIN005'],
        collectedBins: [],
        capacity: 3000,
        currentLoad: 800,
        lastUpdated: new Date(),
        workingHours: { start: '08:00', end: '16:00' },
        efficiency: 87,
        totalDistance: 32.8
      },
      {
        id: 'VEH003',
        name: 'Compact Collector Gamma',
        driverName: 'Mohammed Ali',
        location: { lat: 28.6100, lng: 77.2050 },
        status: 'idle',
        speed: 0,
        fuelLevel: 25,
        route: [],
        assignedBins: [],
        collectedBins: ['BIN006', 'BIN007'],
        capacity: 2000,
        currentLoad: 1200,
        lastUpdated: new Date(),
        workingHours: { start: '10:00', end: '18:00' },
        efficiency: 95,
        totalDistance: 28.5
      },
      {
        id: 'VEH004',
        name: 'Heavy Hauler Delta',
        driverName: 'Suresh Patel',
        location: { lat: 28.6050, lng: 77.2000 },
        status: 'maintenance',
        speed: 0,
        fuelLevel: 90,
        route: [],
        assignedBins: [],
        collectedBins: [],
        capacity: 8000,
        currentLoad: 0,
        lastUpdated: new Date(),
        workingHours: { start: '05:00', end: '13:00' },
        efficiency: 88,
        totalDistance: 0
      }
    ];
    setVehicles(sampleVehicles);
  };

  const generateSampleRoute = () => {
    const stops: RouteStop[] = [
      {
        id: 'DEPOT',
        name: 'Main Depot',
        location: { lat: 28.6139, lng: 77.2090 },
        type: 'depot',
        status: 'completed',
        estimatedTime: new Date(Date.now() - 3600000),
        actualTime: new Date(Date.now() - 3600000)
      },
      {
        id: 'BIN001',
        name: 'City Center - Main Square',
        location: { lat: 28.6150, lng: 77.2100 },
        type: 'bin',
        status: 'completed',
        estimatedTime: new Date(Date.now() - 1800000),
        actualTime: new Date(Date.now() - 1800000)
      },
      {
        id: 'BIN002',
        name: 'Recycling Center - Block A',
        location: { lat: 28.6160, lng: 77.2110 },
        type: 'bin',
        status: 'current',
        estimatedTime: new Date(),
      },
      {
        id: 'BIN003',
        name: 'Park Avenue - Organic Waste',
        location: { lat: 28.6170, lng: 77.2120 },
        type: 'bin',
        status: 'pending',
        estimatedTime: new Date(Date.now() + 900000)
      },
      {
        id: 'FACILITY',
        name: 'Processing Facility',
        location: { lat: 28.6180, lng: 77.2130 },
        type: 'facility',
        status: 'pending',
        estimatedTime: new Date(Date.now() + 1800000)
      }
    ];
    setRouteStops(stops);
  };

  const updateVehiclePositions = () => {
    setVehicles(prevVehicles => 
      prevVehicles.map(vehicle => {
        if (vehicle.status === 'active' && vehicle.route.length > 0) {
          // Simulate movement along route
          const newLat = vehicle.location.lat + (Math.random() - 0.5) * 0.001;
          const newLng = vehicle.location.lng + (Math.random() - 0.5) * 0.001;
          
          return {
            ...vehicle,
            location: { lat: newLat, lng: newLng },
            speed: vehicle.speed + Math.random() * 10 - 5,
            fuelLevel: Math.max(0, vehicle.fuelLevel - Math.random() * 0.5),
            currentLoad: Math.min(vehicle.capacity, vehicle.currentLoad + Math.random() * 100),
            lastUpdated: new Date(),
            totalDistance: vehicle.totalDistance + Math.random() * 0.5
          };
        }
        return { ...vehicle, lastUpdated: new Date() };
      })
    );
  };

  const optimizeRoute = async () => {
    setIsOptimizing(true);
    // Simulate route optimization
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update route with optimized path
    if (selectedVehicle) {
      const optimizedRoute = [...selectedVehicle.route].reverse();
      setVehicles(prev => 
        prev.map(v => 
          v.id === selectedVehicle.id 
            ? { ...v, route: optimizedRoute, efficiency: Math.min(100, v.efficiency + 5) }
            : v
        )
      );
    }
    setIsOptimizing(false);
  };

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateVehiclePositions();
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'idle': return 'text-yellow-500';
      case 'maintenance': return 'text-red-500';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <FaCheckCircle className="h-4 w-4" />;
      case 'idle': return <FaPause className="h-4 w-4" />;
      case 'maintenance': return <FaExclamationTriangle className="h-4 w-4" />;
      case 'offline': return <FaStop className="h-4 w-4" />;
      default: return <FaTruck className="h-4 w-4" />;
    }
  };

  const createVehicleIcon = (vehicle: Vehicle) => {
    const color = vehicle.status === 'active' ? '#22c55e' :
                 vehicle.status === 'idle' ? '#eab308' :
                 vehicle.status === 'maintenance' ? '#ef4444' : '#6b7280';
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 30px; height: 20px; border-radius: 4px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">🚛</div>`,
      iconSize: [30, 20],
      iconAnchor: [15, 10],
      className: 'custom-vehicle-marker'
    });
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filter === 'all') return true;
    return vehicle.status === filter;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Tracking & Route Optimization</h1>
        <p className="text-gray-600">Real-time GPS tracking and intelligent route management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Active Vehicles', value: vehicles.filter(v => v.status === 'active').length, icon: FaTruck, color: 'green' },
          { label: 'Total Distance', value: `${vehicles.reduce((sum, v) => sum + v.totalDistance, 0).toFixed(1)} km`, icon: FaRoute, color: 'blue' },
          { label: 'Avg Efficiency', value: `${(vehicles.reduce((sum, v) => sum + v.efficiency, 0) / vehicles.length).toFixed(1)}%`, icon: BsSpeedometer2, color: 'purple' },
          { label: 'Fuel Alerts', value: vehicles.filter(v => v.fuelLevel < 30).length, icon: FaGasPump, color: 'red' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
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
              <option value="all">All Vehicles ({vehicles.length})</option>
              <option value="active">Active ({vehicles.filter(v => v.status === 'active').length})</option>
              <option value="idle">Idle ({vehicles.filter(v => v.status === 'idle').length})</option>
              <option value="maintenance">Maintenance ({vehicles.filter(v => v.status === 'maintenance').length})</option>
              <option value="offline">Offline ({vehicles.filter(v => v.status === 'offline').length})</option>
            </select>

            <button
              onClick={optimizeRoute}
              disabled={isOptimizing || !selectedVehicle}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FaRoute className={`h-4 w-4 ${isOptimizing ? 'animate-spin' : ''}`} />
              {isOptimizing ? 'Optimizing...' : 'Optimize Route'}
            </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-96 lg:h-[600px]">
              <MapContainer
                ref={mapRef}
                center={[28.6139, 77.2090]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Vehicle Markers */}
                {filteredVehicles.map((vehicle) => (
                  <Marker
                    key={vehicle.id}
                    position={[vehicle.location.lat, vehicle.location.lng]}
                    icon={createVehicleIcon(vehicle)}
                    eventHandlers={{
                      click: () => setSelectedVehicle(vehicle)
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-sm">{vehicle.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">Driver: {vehicle.driverName}</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className={`font-semibold capitalize ${getStatusColor(vehicle.status)}`}>
                              {vehicle.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Speed:</span>
                            <span>{vehicle.speed.toFixed(1)} km/h</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fuel:</span>
                            <span>{vehicle.fuelLevel.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Load:</span>
                            <span>{((vehicle.currentLoad / vehicle.capacity) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Route Polylines */}
                {selectedVehicle && selectedVehicle.route.length > 1 && (
                  <Polyline
                    positions={selectedVehicle.route.map(point => [point.lat, point.lng])}
                    color="#3b82f6"
                    weight={4}
                    opacity={0.7}
                  />
                )}

                {/* Route Stops */}
                {routeStops.map((stop) => {
                  const stopColor = stop.status === 'completed' ? '#22c55e' :
                                   stop.status === 'current' ? '#f59e0b' : '#6b7280';
                  
                  const stopIcon = L.divIcon({
                    html: `<div style="background-color: ${stopColor}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                    className: 'custom-stop-marker'
                  });

                  return (
                    <Marker
                      key={stop.id}
                      position={[stop.location.lat, stop.location.lng]}
                      icon={stopIcon}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-sm">{stop.name}</h3>
                          <p className="text-xs text-gray-600 capitalize">{stop.type}</p>
                          <p className="text-xs text-gray-500">
                            Status: <span className="capitalize font-medium">{stop.status}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            ETA: {stop.estimatedTime.toLocaleTimeString()}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Vehicle Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {selectedVehicle ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{selectedVehicle.name}</h3>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedVehicle.status)} bg-gray-100`}>
                    {getStatusIcon(selectedVehicle.status)}
                    {selectedVehicle.status.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Driver Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaUserClock className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Driver: {selectedVehicle.driverName}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Working Hours: {selectedVehicle.workingHours.start} - {selectedVehicle.workingHours.end}
                    </div>
                  </div>

                  {/* Load Capacity */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Load Capacity</span>
                      <span className="text-sm font-bold">{((selectedVehicle.currentLoad / selectedVehicle.capacity) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          (selectedVehicle.currentLoad / selectedVehicle.capacity) >= 0.9 ? 'bg-red-500' :
                          (selectedVehicle.currentLoad / selectedVehicle.capacity) >= 0.7 ? 'bg-orange-500' :
                          (selectedVehicle.currentLoad / selectedVehicle.capacity) >= 0.5 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(selectedVehicle.currentLoad / selectedVehicle.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {selectedVehicle.currentLoad.toFixed(0)} / {selectedVehicle.capacity} kg
                    </div>
                  </div>

                  {/* Fuel Level */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Fuel Level</span>
                      <span className="text-sm font-bold">{selectedVehicle.fuelLevel.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          selectedVehicle.fuelLevel >= 50 ? 'bg-green-500' :
                          selectedVehicle.fuelLevel >= 25 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${selectedVehicle.fuelLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <BsSpeedometer2 className="h-4 w-4 text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">Speed</span>
                      </div>
                      <div className="text-sm font-bold">{selectedVehicle.speed.toFixed(1)} km/h</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MdGpsFixed className="h-4 w-4 text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">Efficiency</span>
                      </div>
                      <div className="text-sm font-bold">{selectedVehicle.efficiency}%</div>
                    </div>
                  </div>

                  {/* Collection Progress */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Collection Progress</h4>
                    <div className="text-xs text-gray-600">
                      <p>Assigned Bins: {selectedVehicle.assignedBins.length}</p>
                      <p>Collected: {selectedVehicle.collectedBins.length}</p>
                      <p>Remaining: {selectedVehicle.assignedBins.length - selectedVehicle.collectedBins.length}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Current Location</h4>
                    <div className="text-xs text-gray-600">
                      <p>{selectedVehicle.location.lat.toFixed(6)}, {selectedVehicle.location.lng.toFixed(6)}</p>
                      <p className="mt-1">Distance Today: {selectedVehicle.totalDistance.toFixed(1)} km</p>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="text-xs text-gray-500 border-t pt-3">
                    Last updated: {selectedVehicle.lastUpdated.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FaTruck className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Select a vehicle on the map to view details</p>
              </div>
            )}
          </div>

          {/* Route Timeline */}
          {selectedVehicle && routeStops.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Route Timeline</h3>
              <div className="space-y-3">
                {routeStops.map((stop, index) => (
                  <div key={stop.id} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      stop.status === 'completed' ? 'bg-green-500' :
                      stop.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{stop.name}</p>
                      <p className="text-xs text-gray-500">
                        {stop.status === 'completed' && stop.actualTime ? 
                          `Completed: ${stop.actualTime.toLocaleTimeString()}` :
                          `ETA: ${stop.estimatedTime.toLocaleTimeString()}`
                        }
                      </p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      stop.status === 'completed' ? 'bg-green-100 text-green-800' :
                      stop.status === 'current' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {stop.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleTracking;