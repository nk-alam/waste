import { apiGet, apiPost, apiPut, apiDelete } from './api';

// Types for API responses
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// Citizen Types
export interface Citizen {
  id: string;
  personalInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  aadhaar: string;
  address: {
    street?: string;
    city: string;
    state?: string;
    pincode?: string;
    ward?: string;
  };
  status: 'active' | 'inactive' | 'suspended';
  training: {
    modules: string[];
    certificates: string[];
    completionRate: number;
  };
  rewards: {
    totalPoints: number;
    redeemedPoints: number;
    currentLevel: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateCitizenRequest {
  personalInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  aadhaar: string;
  address: {
    street?: string;
    city: string;
    state?: string;
    pincode?: string;
    ward?: string;
  };
}

// Worker Types
export interface Worker {
  id: string;
  personalInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  area: string;
  role: 'collector' | 'supervisor' | 'driver' | 'sorter';
  status: 'active' | 'inactive' | 'on_leave';
  training: {
    phase: number;
    completedPhases: number[];
    certificates: string[];
  };
  safetyGear: {
    status: 'assigned' | 'pending' | 'returned';
    items: string[];
    lastChecked: string;
  };
  attendance: {
    present: number;
    absent: number;
    totalDays: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Green Champion Types
export interface GreenChampion {
  id: string;
  personalInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  areaAssigned: string;
  ulbId: string;
  status: 'active' | 'inactive';
  performance: {
    reportsSubmitted: number;
    violationsReported: number;
    eventsOrganized: number;
    rating: number;
  };
  training: {
    completed: boolean;
    certificationDate?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Waste Management Types
export interface Household {
  id: string;
  address: {
    street?: string;
    city: string;
    state?: string;
    pincode?: string;
    ward?: string;
  };
  residentCount: number;
  ulbId: string;
  segregationStatus: 'compliant' | 'non_compliant' | 'partial';
  segregationScore: number;
  wasteGeneration: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  lastCollection: string;
  createdAt: string;
  updatedAt: string;
}

export interface BulkGenerator {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'hospital' | 'mall' | 'office' | 'market';
  address: {
    street?: string;
    city: string;
    state?: string;
    pincode?: string;
    ward?: string;
  };
  contactPerson: {
    name: string;
    phone: string;
    email?: string;
  };
  ulbId: string;
  compliance: 'compliant' | 'non_compliant' | 'partial';
  wasteGeneration: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  eprCompliance: boolean;
  createdAt: string;
  updatedAt: string;
}

// Collection Types
export interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: 'compactor' | 'tipper' | 'auto' | 'tricycle';
  capacity: number; // in kg
  ulbId: string;
  status: 'active' | 'maintenance' | 'out_of_service';
  driver: {
    id: string;
    name: string;
    phone: string;
  };
  location: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  route: {
    id: string;
    name: string;
    area: string;
  };
  maintenance: {
    lastService: string;
    nextService: string;
    issues: string[];
  };
  createdAt: string;
  updatedAt: string;
}

// Facility Types
export interface Facility {
  id: string;
  name: string;
  type: 'composting' | 'recycling' | 'incineration' | 'landfill' | 'transfer_station';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  capacity: number; // tonnes per day
  ulbId: string;
  status: 'operational' | 'maintenance' | 'closed';
  currentLoad: number;
  efficiency: {
    processingRate: number;
    uptime: number;
    wasteProcessed: number;
  };
  operatingHours: string;
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Monitoring Types
export interface MonitoringReport {
  id: string;
  reporterId: string;
  reporterType: 'citizen' | 'worker' | 'champion';
  type: 'dumping' | 'cleanliness' | 'violation' | 'maintenance';
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  description: string;
  photoUrl?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'acknowledged' | 'in_progress' | 'resolved';
  assignedTo?: string;
  resolution?: {
    action: string;
    completedBy: string;
    completedAt: string;
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ULB Types
export interface ULB {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  population: number;
  area: number; // in sq km
  wasteGeneration: {
    daily: number;
    monthly: number;
    annual: number;
  };
  performance: {
    collectionEfficiency: number;
    processingEfficiency: number;
    recyclingRate: number;
    citizenSatisfaction: number;
  };
  contact: {
    name: string;
    designation: string;
    phone: string;
    email: string;
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// Query parameters for list endpoints
export interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  filter?: Record<string, any>;
}

// Citizen API Services
export const citizenAPI = {
  // Get all citizens with optional filters
  getAll: (params?: QueryParams): Promise<APIResponse<Citizen[]>> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
    if (params?.search) query.append('q', params.search);
    if (params?.sort) query.append('sort', params.sort);
    
    return apiGet(`/citizens?${query.toString()}`);
  },

  // Get citizen by ID
  getById: (id: string): Promise<APIResponse<Citizen>> => {
    return apiGet(`/citizens/${id}`);
  },

  // Create new citizen
  create: (data: CreateCitizenRequest): Promise<APIResponse<Citizen>> => {
    return apiPost('/citizens/register', data);
  },

  // Update citizen profile
  update: (id: string, data: Partial<Citizen>): Promise<APIResponse<Citizen>> => {
    return apiPut(`/citizens/${id}`, data);
  },

  // Delete citizen
  delete: (id: string): Promise<APIResponse<void>> => {
    return apiDelete(`/citizens/${id}`);
  },

  // Enroll in training
  enrollTraining: (citizenId: string, module: string): Promise<APIResponse<void>> => {
    return apiPost('/citizens/training/enroll', { citizenId, module });
  },

  // Complete training
  completeTraining: (citizenId: string, module: string, score: number): Promise<APIResponse<void>> => {
    return apiPut('/citizens/training/complete', { citizenId, module, score });
  },

  // Get reward points
  getPoints: (citizenId: string): Promise<APIResponse<{ totalPoints: number; availablePoints: number; }>> => {
    return apiGet(`/incentives/citizen/points/${citizenId}`);
  }
};

// Worker API Services
export const workerAPI = {
  getAll: (params?: QueryParams): Promise<APIResponse<Worker[]>> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
    if (params?.search) query.append('q', params.search);
    if (params?.filter?.area) query.append('area', params.filter.area);
    if (params?.filter?.role) query.append('role', params.filter.role);
    
    return apiGet(`/workers/list?${query.toString()}`);
  },

  getById: (id: string): Promise<APIResponse<Worker>> => {
    return apiGet(`/workers/${id}`);
  },

  create: (data: Partial<Worker>): Promise<APIResponse<Worker>> => {
    return apiPost('/workers/register', data);
  },

  update: (id: string, data: Partial<Worker>): Promise<APIResponse<Worker>> => {
    return apiPut(`/workers/${id}`, data);
  },

  delete: (id: string): Promise<APIResponse<void>> => {
    return apiDelete(`/workers/${id}`);
  },

  enrollTrainingPhase: (workerId: string, phase: number): Promise<APIResponse<void>> => {
    return apiPost(`/workers/training/phase/${phase}`, { workerId });
  },

  completeTraining: (workerId: string, phase: number): Promise<APIResponse<void>> => {
    return apiPut('/workers/training/complete', { workerId, phase });
  },

  getSafetyGearStatus: (workerId: string): Promise<APIResponse<any>> => {
    return apiGet(`/workers/safety-gear/status/${workerId}`);
  },

  updateAttendance: (workerId: string, date: string, status: 'present' | 'absent'): Promise<APIResponse<void>> => {
    return apiPut('/workers/attendance', { workerId, date, status });
  }
};

// Green Champions API Services
export const championAPI = {
  getAll: (params?: QueryParams): Promise<APIResponse<GreenChampion[]>> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
    if (params?.search) query.append('q', params.search);
    if (params?.filter?.ulbId) query.append('ulbId', params.filter.ulbId);
    if (params?.filter?.area) query.append('area', params.filter.area);
    
    return apiGet(`/green-champions?${query.toString()}`);
  },

  getById: (id: string): Promise<APIResponse<GreenChampion>> => {
    return apiGet(`/green-champions/${id}`);
  },

  create: (data: Partial<GreenChampion>): Promise<APIResponse<GreenChampion>> => {
    return apiPost('/green-champions/register', data);
  },

  update: (id: string, data: Partial<GreenChampion>): Promise<APIResponse<GreenChampion>> => {
    return apiPut(`/green-champions/${id}`, data);
  },

  delete: (id: string): Promise<APIResponse<void>> => {
    return apiDelete(`/green-champions/${id}`);
  },

  getByArea: (areaId: string): Promise<APIResponse<GreenChampion[]>> => {
    return apiGet(`/green-champions/area/${areaId}`);
  },

  submitReport: (data: any): Promise<APIResponse<void>> => {
    return apiPost('/green-champions/monitoring/report', data);
  },

  getPerformance: (championId: string): Promise<APIResponse<any>> => {
    return apiGet(`/green-champions/performance/${championId}`);
  }
};

// Export all API services
export { apiGet, apiPost, apiPut, apiDelete };