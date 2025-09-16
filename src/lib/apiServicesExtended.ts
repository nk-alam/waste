import { apiGet, apiPost, apiPut, apiDelete } from './api';
import { APIResponse, QueryParams, Household, BulkGenerator, Vehicle, Facility, MonitoringReport, ULB } from './apiServices';

// Waste Management API Services
export const wasteAPI = {
  households: {
    getAll: (params?: QueryParams): Promise<APIResponse<Household[]>> => {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', params.page.toString());
      if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
      if (params?.search) query.append('q', params.search);
      if (params?.filter?.ulbId) query.append('ulbId', params.filter.ulbId);
      if (params?.filter?.ward) query.append('ward', params.filter.ward);
      
      return apiGet(`/waste/households?${query.toString()}`);
    },

    getById: (id: string): Promise<APIResponse<Household>> => {
      return apiGet(`/waste/households/${id}`);
    },

    create: (data: Partial<Household>): Promise<APIResponse<Household>> => {
      return apiPost('/waste/household/register', data);
    },

    update: (id: string, data: Partial<Household>): Promise<APIResponse<Household>> => {
      return apiPut(`/waste/households/${id}`, data);
    },

    delete: (id: string): Promise<APIResponse<void>> => {
      return apiDelete(`/waste/households/${id}`);
    },

    updateSegregationStatus: (householdId: string, status: string, score: number): Promise<APIResponse<void>> => {
      return apiPut('/waste/household/segregation-status', { householdId, status, score });
    }
  },

  bulkGenerators: {
    getAll: (params?: QueryParams): Promise<APIResponse<BulkGenerator[]>> => {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', params.page.toString());
      if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
      if (params?.search) query.append('q', params.search);
      if (params?.filter?.ulbId) query.append('ulbId', params.filter.ulbId);
      
      return apiGet(`/waste/bulk-generators?${query.toString()}`);
    },

    getById: (id: string): Promise<APIResponse<BulkGenerator>> => {
      return apiGet(`/waste/bulk-generators/${id}`);
    },

    create: (data: Partial<BulkGenerator>): Promise<APIResponse<BulkGenerator>> => {
      return apiPost('/waste/bulk-generator/register', data);
    },

    update: (id: string, data: Partial<BulkGenerator>): Promise<APIResponse<BulkGenerator>> => {
      return apiPut(`/waste/bulk-generators/${id}`, data);
    },

    delete: (id: string): Promise<APIResponse<void>> => {
      return apiDelete(`/waste/bulk-generators/${id}`);
    },

    updateCompliance: (bulkId: string, compliance: string): Promise<APIResponse<void>> => {
      return apiPut('/waste/bulk-generator/compliance', { bulkId, compliance });
    }
  },

  getSegregationGuidelines: (): Promise<APIResponse<any>> => {
    return apiGet('/waste/segregation/guidelines');
  },

  reportViolation: (data: any): Promise<APIResponse<void>> => {
    return apiPost('/waste/segregation/violation', data);
  }
};

// Collection & Transportation API Services
export const collectionAPI = {
  vehicles: {
    getAll: (params?: QueryParams): Promise<APIResponse<Vehicle[]>> => {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', params.page.toString());
      if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
      if (params?.filter?.ulbId) query.append('ulbId', params.filter.ulbId);
      if (params?.filter?.type) query.append('type', params.filter.type);
      if (params?.filter?.status) query.append('status', params.filter.status);
      if (params?.filter?.area) query.append('area', params.filter.area);
      
      return apiGet(`/collection/vehicles?${query.toString()}`);
    },

    getById: (id: string): Promise<APIResponse<Vehicle>> => {
      return apiGet(`/collection/vehicles/${id}`);
    },

    create: (data: Partial<Vehicle>): Promise<APIResponse<Vehicle>> => {
      return apiPost('/collection/vehicles/register', data);
    },

    update: (id: string, data: Partial<Vehicle>): Promise<APIResponse<Vehicle>> => {
      return apiPut(`/collection/vehicles/${id}`, data);
    },

    delete: (id: string): Promise<APIResponse<void>> => {
      return apiDelete(`/collection/vehicles/${id}`);
    },

    getLocation: (vehicleId: string): Promise<APIResponse<any>> => {
      return apiGet(`/collection/vehicles/location/${vehicleId}`);
    },

    updateStatus: (vehicleId: string, status: string): Promise<APIResponse<void>> => {
      return apiPut(`/collection/vehicles/status`, { vehicleId, status });
    }
  },

  routes: {
    optimize: (areaId: string): Promise<APIResponse<any>> => {
      return apiGet(`/collection/routes/optimize?areaId=${areaId}`);
    },

    getSchedule: (areaId: string): Promise<APIResponse<any>> => {
      return apiGet(`/collection/schedule/${areaId}`);
    }
  },

  pickups: {
    complete: (data: any): Promise<APIResponse<void>> => {
      return apiPost('/collection/pickup/complete', data);
    },

    reject: (data: any): Promise<APIResponse<void>> => {
      return apiPut('/collection/pickup/reject', data);
    }
  },

  complaints: {
    create: (data: any): Promise<APIResponse<void>> => {
      return apiPost('/collection/complaints', data);
    },

    getAll: (params?: QueryParams): Promise<APIResponse<any[]>> => {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', params.page.toString());
      if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
      
      return apiGet(`/collection/complaints?${query.toString()}`);
    }
  },

  getStats: (): Promise<APIResponse<any>> => {
    return apiGet('/collection/stats');
  }
};

// Facility Management API Services
export const facilityAPI = {
  getAll: (params?: QueryParams): Promise<APIResponse<Facility[]>> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
    if (params?.filter?.ulbId) query.append('ulbId', params.filter.ulbId);
    if (params?.filter?.type) query.append('type', params.filter.type);
    if (params?.filter?.status) query.append('status', params.filter.status);
    
    return apiGet(`/facilities?${query.toString()}`);
  },

  getById: (id: string): Promise<APIResponse<Facility>> => {
    return apiGet(`/facilities/${id}`);
  },

  create: (data: Partial<Facility>): Promise<APIResponse<Facility>> => {
    return apiPost('/facilities/register', data);
  },

  update: (id: string, data: Partial<Facility>): Promise<APIResponse<Facility>> => {
    return apiPut(`/facilities/${id}`, data);
  },

  delete: (id: string): Promise<APIResponse<void>> => {
    return apiDelete(`/facilities/${id}`);
  },

  getCapacity: (facilityId: string): Promise<APIResponse<any>> => {
    return apiGet(`/facilities/capacity/${facilityId}`);
  },

  logIntake: (data: any): Promise<APIResponse<void>> => {
    return apiPut('/facilities/intake', data);
  },

  getEfficiency: (facilityId: string): Promise<APIResponse<any>> => {
    return apiGet(`/facilities/efficiency/${facilityId}`);
  },

  updateIntake: (intakeId: string, data: any): Promise<APIResponse<void>> => {
    return apiPut(`/facilities/intakes/${intakeId}`, data);
  },

  deleteIntake: (intakeId: string): Promise<APIResponse<void>> => {
    return apiDelete(`/facilities/intakes/${intakeId}`);
  }
};

// Monitoring System API Services
export const monitoringAPI = {
  reports: {
    getAll: (params?: QueryParams): Promise<APIResponse<MonitoringReport[]>> => {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', params.page.toString());
      if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
      if (params?.search) query.append('q', params.search);
      
      return apiGet(`/monitoring/community-reports?${query.toString()}`);
    },

    create: (data: any): Promise<APIResponse<MonitoringReport>> => {
      return apiPost('/monitoring/photo-upload', data);
    },

    update: (reportId: string, data: any): Promise<APIResponse<MonitoringReport>> => {
      return apiPut(`/monitoring/report/${reportId}`, data);
    },

    delete: (reportId: string): Promise<APIResponse<void>> => {
      return apiDelete(`/monitoring/report/${reportId}`);
    }
  },

  dumpingSites: {
    getAll: (): Promise<APIResponse<any[]>> => {
      return apiGet('/monitoring/dumping-sites');
    },

    markCleanup: (siteId: string, data: any): Promise<APIResponse<void>> => {
      return apiPut('/monitoring/dumping-sites/cleanup', { siteId, ...data });
    }
  },

  cleanliness: {
    submitScore: (data: any): Promise<APIResponse<void>> => {
      return apiPost('/monitoring/area-cleanliness/score', data);
    }
  }
};

// Incentives & Penalties API Services
export const incentiveAPI = {
  rewards: {
    getAll: (): Promise<APIResponse<any[]>> => {
      return apiGet('/incentives/rewards');
    },

    awardPoints: (data: any): Promise<APIResponse<void>> => {
      return apiPost('/incentives/citizen/award', data);
    },

    processReward: (data: any): Promise<APIResponse<void>> => {
      return apiPost('/incentives/bulk-generator/reward', data);
    },

    redeem: (data: any): Promise<APIResponse<void>> => {
      return apiPost('/incentives/redeem', data);
    }
  },

  penalties: {
    impose: (data: any): Promise<APIResponse<void>> => {
      return apiPost('/penalties/impose', data);
    },

    processPayment: (data: any): Promise<APIResponse<void>> => {
      return apiPut('/penalties/payment', data);
    },

    getCitizenHistory: (citizenId: string): Promise<APIResponse<any[]>> => {
      return apiGet(`/penalties/citizen/${citizenId}`);
    },

    suspendCollection: (data: any): Promise<APIResponse<void>> => {
      return apiPost('/penalties/waste-collection/suspend', data);
    }
  },

  getStats: (): Promise<APIResponse<any>> => {
    return apiGet('/incentives/stats');
  }
};

// Community Engagement API Services
export const communityAPI = {
  events: {
    getAll: (params?: QueryParams): Promise<APIResponse<any[]>> => {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', params.page.toString());
      if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
      
      return apiGet(`/community/events?${query.toString()}`);
    },

    create: (data: any): Promise<APIResponse<any>> => {
      return apiPost('/community/cleaning-day/schedule', data);
    },

    update: (id: string, data: any): Promise<APIResponse<any>> => {
      return apiPut(`/community/events/${id}`, data);
    },

    delete: (id: string): Promise<APIResponse<void>> => {
      return apiDelete(`/community/events/${id}`);
    }
  },

  campaigns: {
    create: (data: any): Promise<APIResponse<any>> => {
      return apiPost('/community/awareness/campaign', data);
    },

    getAll: (params?: QueryParams): Promise<APIResponse<any[]>> => {
      const query = new URLSearchParams();
      if (params?.page) query.append('page', params.page.toString());
      if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
      
      return apiGet(`/community/campaigns?${query.toString()}`);
    }
  }
};

// ULB Management API Services
export const ulbAPI = {
  getAll: (params?: QueryParams): Promise<APIResponse<ULB[]>> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.pageSize) query.append('pageSize', params.pageSize.toString());
    if (params?.search) query.append('q', params.search);
    
    return apiGet(`/ulb?${query.toString()}`);
  },

  getById: (id: string): Promise<APIResponse<ULB>> => {
    return apiGet(`/ulb/${id}`);
  },

  create: (data: Partial<ULB>): Promise<APIResponse<ULB>> => {
    return apiPost('/ulb/register', data);
  },

  update: (id: string, data: Partial<ULB>): Promise<APIResponse<ULB>> => {
    return apiPut(`/ulb/${id}`, data);
  },

  delete: (id: string): Promise<APIResponse<void>> => {
    return apiDelete(`/ulb/${id}`);
  },

  getFacilities: (ulbId: string): Promise<APIResponse<any[]>> => {
    return apiGet(`/ulb/${ulbId}/facilities`);
  },

  getPerformanceDashboard: (ulbId?: string): Promise<APIResponse<any>> => {
    const endpoint = ulbId ? `/ulb/performance/dashboard/${ulbId}` : '/ulb/performance/dashboard';
    return apiGet(endpoint);
  },

  getComplianceReport: (ulbId: string): Promise<APIResponse<any>> => {
    return apiGet(`/ulb/compliance/report/${ulbId}`);
  },

  updatePolicy: (data: any): Promise<APIResponse<void>> => {
    return apiPost('/ulb/policy/update', data);
  },

  updateWasteStatus: (data: any): Promise<APIResponse<void>> => {
    return apiPut('/ulb/waste-management/status', data);
  }
};

// Shop & Marketplace API Services
export const shopAPI = {
  compostKits: {
    getAll: (): Promise<APIResponse<any[]>> => {
      return apiGet('/shop/compost-kits');
    },

    order: (data: any): Promise<APIResponse<any>> => {
      return apiPost('/shop/compost-kits/order', data);
    }
  },

  dustbins: {
    getAll: (): Promise<APIResponse<any[]>> => {
      return apiGet('/shop/dustbins');
    },

    order: (data: any): Promise<APIResponse<any>> => {
      return apiPost('/shop/dustbins/order', data);
    }
  },

  recyclingCenters: {
    getAll: (): Promise<APIResponse<any[]>> => {
      return apiGet('/shop/recycling-centers');
    }
  },

  scrap: {
    getListings: (): Promise<APIResponse<any[]>> => {
      return apiGet('/shop/scrap/listings');
    },

    sell: (data: any): Promise<APIResponse<any>> => {
      return apiPost('/shop/scrap/sell', data);
    },

    getBuyers: (): Promise<APIResponse<any[]>> => {
      return apiGet('/shop/scrap/buyers');
    }
  },

  orders: {
    getByUser: (citizenId: string): Promise<APIResponse<any[]>> => {
      return apiGet(`/shop/orders/${citizenId}`);
    },

    updateStatus: (orderId: string, status: string): Promise<APIResponse<void>> => {
      return apiPut(`/shop/orders/${orderId}/status`, { status });
    }
  }
};

// Analytics & Reports API Services
export const analyticsAPI = {
  wasteGeneration: {
    daily: (params?: any): Promise<APIResponse<any>> => {
      const query = new URLSearchParams();
      if (params?.startDate) query.append('startDate', params.startDate);
      if (params?.endDate) query.append('endDate', params.endDate);
      if (params?.ulbId) query.append('ulbId', params.ulbId);
      
      return apiGet(`/analytics/waste-generation/daily?${query.toString()}`);
    }
  },

  treatment: {
    efficiency: (params?: any): Promise<APIResponse<any>> => {
      const query = new URLSearchParams();
      if (params?.facilityId) query.append('facilityId', params.facilityId);
      if (params?.period) query.append('period', params.period);
      
      return apiGet(`/analytics/waste-treatment/efficiency?${query.toString()}`);
    }
  },

  training: {
    completion: (params?: any): Promise<APIResponse<any>> => {
      const query = new URLSearchParams();
      if (params?.userType) query.append('userType', params.userType);
      if (params?.period) query.append('period', params.period);
      
      return apiGet(`/analytics/citizen-training/completion?${query.toString()}`);
    }
  },

  segregation: {
    compliance: (params?: any): Promise<APIResponse<any>> => {
      const query = new URLSearchParams();
      if (params?.ulbId) query.append('ulbId', params.ulbId);
      if (params?.period) query.append('period', params.period);
      
      return apiGet(`/analytics/segregation/compliance?${query.toString()}`);
    }
  },

  collection: {
    efficiency: (params?: any): Promise<APIResponse<any>> => {
      const query = new URLSearchParams();
      if (params?.ulbId) query.append('ulbId', params.ulbId);
      if (params?.period) query.append('period', params.period);
      
      return apiGet(`/analytics/collection/efficiency?${query.toString()}`);
    }
  },

  facilities: {
    utilization: (params?: any): Promise<APIResponse<any>> => {
      const query = new URLSearchParams();
      if (params?.facilityType) query.append('facilityType', params.facilityType);
      if (params?.period) query.append('period', params.period);
      
      return apiGet(`/analytics/facilities/utilization?${query.toString()}`);
    }
  },

  penalties: {
    revenue: (params?: any): Promise<APIResponse<any>> => {
      const query = new URLSearchParams();
      if (params?.period) query.append('period', params.period);
      if (params?.ulbId) query.append('ulbId', params.ulbId);
      
      return apiGet(`/analytics/penalties/revenue?${query.toString()}`);
    }
  },

  incentives: {
    distribution: (params?: any): Promise<APIResponse<any>> => {
      const query = new URLSearchParams();
      if (params?.period) query.append('period', params.period);
      if (params?.type) query.append('type', params.type);
      
      return apiGet(`/analytics/incentives/distribution?${query.toString()}`);
    }
  }
};