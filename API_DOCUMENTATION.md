# Smart Waste Management System - API Documentation

## Overview

This API documentation covers all the backend endpoints for the Smart Waste Management System developed for Smart India Hackathon 2025. The system addresses India's waste management challenges through comprehensive digital infrastructure.

## Problem Statement Solution

### Current Waste Management Crisis in India
- **Daily Waste Generation**: 1,70,339 tonnes per day (TPD)
- **Collection Rate**: 1,56,449 TPD (91.8%)
- **Treatment Rate**: 91,511 TPD (54% of total generated)
- **Landfill Disposal**: 41,455 TPD
- **Management Gap**: 37,373 TPD unmanaged waste

### Our Solution Architecture
Our system addresses all 9 expected solutions through comprehensive API endpoints:

1. **Mandatory Citizen Training** - `/api/citizens/training`
2. **Waste Worker Training** - `/api/workers/training`
3. **Green Champions Monitoring** - `/api/green-champions`
4. **Incentive System** - `/api/incentives`
5. **Community Participation** - `/api/community`
6. **Penalization System** - `/api/incentives/penalties`
7. **Facility Management** - `/api/facilities`
8. **Digital App System** - All API endpoints
9. **Real-time Monitoring** - `/api/monitoring`

## Base Configuration

**Base URL**: `http://localhost:3001/api`
**Authentication**: JWT Bearer Token
**Database**: Firebase Firestore
**Storage**: Firebase Storage

### Environment Variables
```bash
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
JWT_SECRET=your_jwt_secret
PORT=3001
```

## Authentication APIs

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "citizen", // citizen, worker, champion, supervisor, ulb_admin, admin
  "phone": "+91-9876543210",
  "address": {
    "street": "123 Main St",
    "city": "New Delhi",
    "state": "Delhi",
    "pincode": "110001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "citizen"
    },
    "token": "jwt_token_here"
  }
}
```

### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer jwt_token_here
```

## Citizens Management APIs

### Get All Citizens
```
GET /api/citizens
Authorization: Bearer jwt_token_here
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- search: string
- ward: string
- trainingStatus: boolean
```

### Create Citizen
```
POST /api/citizens
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91-9876543211",
  "address": {
    "street": "456 Park Ave",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "ward": "Ward-1",
  "householdSize": 4,
  "wasteGenerationType": "residential"
}
```

### Update Citizen Training Status
```
PUT /api/citizens/:id/training
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "completed": true,
  "completionDate": "2024-09-17",
  "score": 85,
  "certificateIssued": true
}
```

### Citizen Training Progress
```
GET /api/citizens/:id/training-progress
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "citizenId": "citizen123",
    "trainingModules": [
      {
        "module": "Waste Segregation",
        "completed": true,
        "score": 90,
        "completedAt": "2024-09-15"
      },
      {
        "module": "Composting",
        "completed": false,
        "progress": 60
      }
    ],
    "overallProgress": 75,
    "certificateEarned": false
  }
}
```

## Workers Management APIs

### Get All Workers
```
GET /api/workers
Authorization: Bearer jwt_token_here
Query Parameters:
- department: string
- shift: string (morning, afternoon, night)
- status: string (active, inactive, on_leave)
```

### Create Worker
```
POST /api/workers
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Rajesh Kumar",
  "email": "rajesh@wastems.com",
  "phone": "+91-9876543212",
  "employeeId": "EMP001",
  "department": "Collection",
  "shift": "morning",
  "vehicleAssigned": "TRK001",
  "safetyTrainingCompleted": false,
  "joiningDate": "2024-01-15"
}
```

### Update Worker Training
```
PUT /api/workers/:id/training
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "safetyTrainingCompleted": true,
  "trainingDate": "2024-09-17",
  "certificationLevel": "Level-2",
  "safetyGearIssued": true,
  "nextRefresherDate": "2024-12-17"
}
```

### Worker Attendance
```
POST /api/workers/:id/attendance
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "date": "2024-09-17",
  "clockIn": "08:00",
  "clockOut": "16:00",
  "location": {
    "lat": 28.6139,
    "lng": 77.2090
  },
  "workType": "collection"
}
```

## Green Champions APIs

### Get All Green Champions
```
GET /api/green-champions
Authorization: Bearer jwt_token_here
Query Parameters:
- area: string
- status: string (active, inactive)
- performanceRating: number
```

### Create Green Champion
```
POST /api/green-champions
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "+91-9876543213",
  "assignedArea": "Sector-15",
  "specialization": ["monitoring", "training", "enforcement"],
  "certificationLevel": "Advanced",
  "appointmentDate": "2024-02-01"
}
```

### Submit Monitoring Report
```
POST /api/green-champions/:id/reports
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

{
  "location": {
    "lat": 28.6139,
    "lng": 77.2090,
    "address": "Main Market, Sector-15"
  },
  "reportType": "violation", // violation, improvement, training_needed
  "description": "Waste not properly segregated",
  "severity": "medium", // low, medium, high
  "photos": [file1, file2], // Upload files
  "actionRequired": "Immediate training required for residents"
}
```

### Get Champion Performance
```
GET /api/green-champions/:id/performance
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "championId": "champion123",
    "reportsSubmitted": 45,
    "violationsReported": 12,
    "trainingsCompleted": 8,
    "areasCovered": 5,
    "performanceScore": 92,
    "lastActiveDate": "2024-09-17",
    "achievements": ["Top Performer", "Training Expert"]
  }
}
```

## Waste Management APIs

### Record Waste Collection
```
POST /api/waste/collection
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "collectionId": "COL001",
  "vehicleId": "TRK001",
  "workerId": "worker123",
  "route": "Route-A",
  "collections": [
    {
      "location": {
        "lat": 28.6139,
        "lng": 77.2090,
        "address": "House No. 123, Sector-15"
      },
      "wasteType": "organic",
      "weight": 15.5,
      "quality": "properly_segregated", // properly_segregated, mixed, contaminated
      "timestamp": "2024-09-17T08:30:00Z"
    }
  ],
  "totalWeight": 150.5,
  "startTime": "2024-09-17T08:00:00Z",
  "endTime": "2024-09-17T12:00:00Z"
}
```

### Get Waste Statistics
```
GET /api/waste/statistics
Authorization: Bearer jwt_token_here
Query Parameters:
- startDate: YYYY-MM-DD
- endDate: YYYY-MM-DD
- wasteType: string
- area: string
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCollected": 1250.5,
    "breakdown": {
      "organic": 650.2,
      "recyclable": 400.3,
      "hazardous": 25.0,
      "general": 175.0
    },
    "treatmentStatus": {
      "processed": 950.3,
      "pending": 300.2
    },
    "recyclingRate": 76.2,
    "trend": "increasing"
  }
}
```

### Track Waste Treatment
```
POST /api/waste/treatment
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "facilityId": "FAC001",
  "wasteCollectionId": "COL001",
  "treatmentType": "composting", // composting, recycling, waste_to_energy, landfill
  "inputWeight": 150.5,
  "outputWeight": 120.3,
  "efficiency": 79.9,
  "startTime": "2024-09-17T13:00:00Z",
  "endTime": "2024-09-17T17:00:00Z",
  "byProducts": {
    "compost": 45.2,
    "biogas": 0,
    "recyclables": 75.1
  }
}
```

## Collection Management APIs

### Schedule Collection Route
```
POST /api/collection/routes
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "routeName": "Route-A-Morning",
  "vehicleId": "TRK001",
  "driverId": "worker123",
  "scheduledDate": "2024-09-18",
  "shift": "morning",
  "waypoints": [
    {
      "order": 1,
      "location": {
        "lat": 28.6139,
        "lng": 77.2090,
        "address": "Sector-15, Block-A"
      },
      "estimatedTime": "08:30",
      "wasteType": ["organic", "recyclable"]
    }
  ],
  "estimatedDuration": "4 hours",
  "estimatedDistance": "25 km"
}
```

### Update Collection Status
```
PUT /api/collection/routes/:id/status
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "status": "in_progress", // scheduled, in_progress, completed, cancelled
  "currentLocation": {
    "lat": 28.6139,
    "lng": 77.2090
  },
  "completedWaypoints": 3,
  "nextWaypoint": 4,
  "notes": "Traffic delay on main road"
}
```

### Vehicle Tracking
```
POST /api/collection/vehicle-tracking
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "vehicleId": "TRK001",
  "location": {
    "lat": 28.6139,
    "lng": 77.2090
  },
  "speed": 35,
  "fuelLevel": 75,
  "timestamp": "2024-09-17T10:30:00Z",
  "status": "active" // active, idle, maintenance
}
```

## Facilities Management APIs

### Get All Facilities
```
GET /api/facilities
Authorization: Bearer jwt_token_here
Query Parameters:
- type: string (treatment, recycling, composting, waste_to_energy)
- status: string (operational, maintenance, closed)
- capacity: number
```

### Create Facility
```
POST /api/facilities
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Central Composting Facility",
  "type": "composting",
  "location": {
    "lat": 28.6139,
    "lng": 77.2090,
    "address": "Industrial Area, Sector-25"
  },
  "capacity": 100,
  "operationalHours": {
    "start": "06:00",
    "end": "18:00"
  },
  "contactPerson": {
    "name": "Facility Manager",
    "phone": "+91-9876543214"
  },
  "equipment": [
    {
      "name": "Composting Unit-1",
      "capacity": 50,
      "status": "operational"
    }
  ]
}
```

### Record Facility Performance
```
POST /api/facilities/:id/performance
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "date": "2024-09-17",
  "inputWeight": 500.5,
  "outputWeight": 400.3,
  "efficiency": 79.9,
  "downtime": 2.5,
  "maintenanceRequired": false,
  "energyConsumed": 125.5,
  "byProducts": {
    "compost": 180.2,
    "biogas": 0,
    "water": 220.1
  }
}
```

## Monitoring System APIs

### Real-time Bin Monitoring
```
GET /api/monitoring/bins
Authorization: Bearer jwt_token_here
Query Parameters:
- area: string
- fillLevel: number (0-100)
- status: string (empty, low, medium, high, full, overflow)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "binId": "BIN001",
      "location": {
        "lat": 28.6139,
        "lng": 77.2090,
        "address": "Main Market, Sector-15"
      },
      "fillLevel": 75,
      "status": "high",
      "lastUpdated": "2024-09-17T10:30:00Z",
      "sensorData": {
        "temperature": 28.5,
        "humidity": 65,
        "weight": 45.2
      },
      "batteryLevel": 85,
      "signalStrength": 92
    }
  ]
}
```

### IoT Device Management
```
POST /api/monitoring/iot-devices
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "deviceId": "IOT001",
  "deviceType": "bin_sensor",
  "location": {
    "lat": 28.6139,
    "lng": 77.2090
  },
  "sensorTypes": ["fill_level", "temperature", "humidity", "weight"],
  "installationDate": "2024-09-01",
  "firmwareVersion": "v2.1.3"
}
```

### Submit Photo Report
```
POST /api/monitoring/photo-reports
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

{
  "location": {
    "lat": 28.6139,
    "lng": 77.2090,
    "address": "Dumping site near highway"
  },
  "reportType": "illegal_dumping",
  "description": "Large pile of mixed waste dumped illegally",
  "photos": [file1, file2, file3],
  "urgency": "high",
  "reportedBy": "citizen123"
}
```

## Incentives & Penalties APIs

### Award Incentive
```
POST /api/incentives/award
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "recipientId": "citizen123",
  "recipientType": "citizen", // citizen, worker, champion, facility
  "incentiveType": "points", // points, cash, voucher, certificate
  "amount": 100,
  "reason": "Excellent waste segregation for 30 consecutive days",
  "category": "segregation_excellence",
  "validUntil": "2024-12-31"
}
```

### Issue Penalty
```
POST /api/incentives/penalty
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "violatorId": "citizen456",
  "violatorType": "citizen",
  "violationType": "improper_segregation",
  "description": "Mixed waste disposal in organic bin",
  "fineAmount": 500,
  "dueDate": "2024-10-17",
  "evidencePhotos": ["photo1.jpg", "photo2.jpg"],
  "issuedBy": "champion123"
}
```

### Get Leaderboard
```
GET /api/incentives/leaderboard
Authorization: Bearer jwt_token_here
Query Parameters:
- type: string (citizen, worker, champion)
- period: string (weekly, monthly, yearly)
- category: string
```

## Community Engagement APIs

### Create Community Event
```
POST /api/community/events
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "Community Cleaning Drive",
  "description": "Monthly cleaning drive for Sector-15",
  "eventType": "cleaning_drive",
  "date": "2024-09-25",
  "startTime": "08:00",
  "endTime": "12:00",
  "location": {
    "lat": 28.6139,
    "lng": 77.2090,
    "address": "Central Park, Sector-15"
  },
  "maxParticipants": 100,
  "organizer": "champion123",
  "incentives": {
    "participationPoints": 50,
    "completionCertificate": true
  }
}
```

### Register for Event
```
POST /api/community/events/:id/register
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "participantId": "citizen123",
  "participantType": "citizen"
}
```

### Submit Feedback
```
POST /api/community/feedback
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "category": "service_quality",
  "rating": 4,
  "comment": "Good collection service but timing can be improved",
  "area": "Sector-15",
  "serviceType": "waste_collection"
}
```

## Analytics APIs

### Get Dashboard Statistics
```
GET /api/analytics/dashboard
Authorization: Bearer jwt_token_here
Query Parameters:
- period: string (daily, weekly, monthly, yearly)
- area: string
```

**Response:**
```json
{
  "success": true,
  "data": {
    "wasteCollection": {
      "total": 1250.5,
      "byType": {
        "organic": 650.2,
        "recyclable": 400.3,
        "hazardous": 25.0,
        "general": 175.0
      },
      "trend": "+12.5%"
    },
    "recyclingRate": 76.2,
    "citizenEngagement": {
      "trainedCitizens": 1250,
      "activeChampions": 45,
      "reportSubmitted": 156
    },
    "facilityPerformance": {
      "averageEfficiency": 84.2,
      "uptime": 96.5
    }
  }
}
```

### Generate Report
```
POST /api/analytics/reports/generate
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "reportType": "monthly_summary",
  "period": {
    "startDate": "2024-09-01",
    "endDate": "2024-09-30"
  },
  "includeCharts": true,
  "format": "pdf", // pdf, excel, csv
  "sections": ["waste_collection", "recycling", "citizen_engagement", "facilities"]
}
```

## Shop/Marketplace APIs

### Get Products
```
GET /api/shop/products
Authorization: Bearer jwt_token_here
Query Parameters:
- category: string (dustbins, compost_kits, tools, safety_gear)
- priceRange: string
- inStock: boolean
```

### Create Order
```
POST /api/shop/orders
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "customerId": "citizen123",
  "items": [
    {
      "productId": "PROD001",
      "quantity": 3,
      "price": 299.99
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New Delhi",
    "pincode": "110001"
  },
  "paymentMethod": "online",
  "totalAmount": 899.97
}
```

### Scrap Collection Request
```
POST /api/shop/scrap-collection
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "customerId": "citizen123",
  "scrapItems": [
    {
      "type": "paper",
      "weight": 5.5,
      "estimatedValue": 55.0
    },
    {
      "type": "plastic",
      "weight": 2.3,
      "estimatedValue": 46.0
    }
  ],
  "pickupAddress": {
    "street": "123 Main St",
    "city": "New Delhi",
    "pincode": "110001"
  },
  "preferredTime": "morning",
  "totalEstimatedValue": 101.0
}
```

## ULB Management APIs

### Get ULB Performance
```
GET /api/ulb/performance
Authorization: Bearer jwt_token_here
Query Parameters:
- ulbId: string
- period: string
```

### Create Policy
```
POST /api/ulb/policies
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "New Waste Segregation Policy",
  "description": "Mandatory 3-bin system for all households",
  "effectiveDate": "2024-10-01",
  "applicableAreas": ["Sector-15", "Sector-16"],
  "penaltyStructure": {
    "firstViolation": 100,
    "secondViolation": 250,
    "thirdViolation": 500
  },
  "category": "segregation"
}
```

### Budget Management
```
POST /api/ulb/budget
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "year": 2024,
  "allocations": {
    "collection": 5000000,
    "treatment": 3000000,
    "training": 1000000,
    "infrastructure": 8000000,
    "monitoring": 500000
  },
  "revenue": {
    "fees": 2000000,
    "penalties": 300000,
    "recycling": 800000,
    "grants": 10000000
  }
}
```

## File Upload APIs

### Upload Single File
```
POST /api/upload/single
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

{
  "file": [file],
  "category": "report_photos", // report_photos, certificates, documents
  "description": "Photo evidence of illegal dumping"
}
```

### Upload Multiple Files
```
POST /api/upload/multiple
Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data

{
  "files": [file1, file2, file3],
  "category": "training_materials"
}
```

## Notification APIs

### Send Notification
```
POST /api/notifications/send
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "recipients": ["citizen123", "worker456"],
  "type": "alert", // alert, reminder, info, announcement
  "title": "Collection Schedule Change",
  "message": "Tomorrow's waste collection has been rescheduled to 9 AM",
  "priority": "medium", // low, medium, high
  "category": "schedule"
}
```

### Get User Notifications
```
GET /api/notifications
Authorization: Bearer jwt_token_here
Query Parameters:
- unread: boolean
- type: string
- limit: number
```

## WebSocket Events

### Real-time Updates
The system supports real-time updates through WebSocket connections:

- **Bin Status Updates**: `bin-status-update`
- **Vehicle Location**: `vehicle-location-update`
- **New Reports**: `new-report`
- **Notifications**: `notification`
- **Collection Status**: `collection-status-update`

### Connection
```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'jwt_token_here'
  }
});

socket.on('bin-status-update', (data) => {
  console.log('Bin status updated:', data);
});
```

## Error Handling

All APIs follow a consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Validation failed",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

### Common Error Codes
- `UNAUTHORIZED`: Invalid or missing authentication
- `FORBIDDEN`: Insufficient permissions
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Resource not found
- `DUPLICATE_ENTRY`: Resource already exists
- `SERVER_ERROR`: Internal server error

## Rate Limiting

- **General APIs**: 100 requests per 15 minutes per IP
- **Upload APIs**: 10 requests per minute per user
- **Real-time APIs**: 1000 requests per hour per user

## Data Models

### Core Collections in Firestore

1. **users** - User accounts and profiles
2. **citizens** - Citizen-specific data and training records
3. **workers** - Worker profiles and performance data
4. **greenChampions** - Green champion assignments and reports
5. **wasteCollections** - Waste collection records
6. **facilities** - Treatment and recycling facilities
7. **bins** - Smart bin locations and sensor data
8. **vehicles** - Vehicle tracking and maintenance
9. **incentives** - Points, rewards, and penalties
10. **reports** - Photo reports and monitoring data
11. **events** - Community events and participation
12. **notifications** - System notifications
13. **orders** - Marketplace orders and transactions

## Testing

### Sample API Test Commands

```bash
# Register a new citizen
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Citizen",
    "email": "test@example.com",
    "password": "password123",
    "role": "citizen"
  }'

# Get waste statistics
curl -X GET "http://localhost:3001/api/waste/statistics?startDate=2024-09-01&endDate=2024-09-17" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Submit a photo report
curl -X POST http://localhost:3001/api/monitoring/photo-reports \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "location[lat]=28.6139" \
  -F "location[lng]=77.2090" \
  -F "reportType=illegal_dumping" \
  -F "description=Waste dumped illegally" \
  -F "photos=@photo1.jpg"
```

## Implementation Status

✅ **Implemented APIs**:
- Authentication & Authorization
- Citizens Management
- Workers Management
- Green Champions
- Waste Management
- Collection Management
- Facilities Management
- Monitoring System
- Analytics & Reporting
- Community Engagement
- Incentives & Penalties
- Shop/Marketplace
- File Upload
- Notifications

🔄 **In Progress**:
- Real-time WebSocket implementation
- Advanced analytics algorithms
- Mobile push notifications

📝 **Planned**:
- AI-powered route optimization
- Predictive analytics for waste generation
- Integration with government databases
- Advanced reporting with ML insights

## Support

For API support and documentation updates, contact the development team.

---

**Note**: This API documentation is designed for the Smart India Hackathon 2025 and addresses all the required solutions for India's waste management challenges. The system provides comprehensive digital infrastructure for training, monitoring, and managing waste at every level from citizens to facilities.