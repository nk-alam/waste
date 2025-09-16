# 🚀 Production Deployment Guide - EcoWaste India by QBrain

## Prerequisites

1. **Firebase Project Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project named `ecowaste-india-qbrain`
   - Enable the following services:
     - ✅ Firestore Database
     - ✅ Authentication
     - ✅ Storage
     - ✅ Hosting (optional)

2. **Vercel Account**
   - Create account at [vercel.com](https://vercel.com)
   - Connect your GitHub repository

## Step 1: Firebase Configuration

### 1.1 Get Firebase Config
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click "Web app" and register your app
4. Copy the Firebase configuration object

### 1.2 Enable Firebase Services

**Firestore Database:**
```bash
# Go to Firestore Database in Firebase Console
# Click "Create database"
# Choose "Start in production mode"
# Select region closest to your users (asia-south1 for India)
```

**Authentication:**
```bash
# Go to Authentication > Sign-in method
# Enable Email/Password
# Enable Google (optional)
# Add authorized domains: your-vercel-domain.vercel.app
```

**Storage:**
```bash
# Go to Storage in Firebase Console
# Click "Get started"
# Choose "Start in production mode"
# Select same region as Firestore
```

## Step 2: Environment Variables for Vercel

### 2.1 Required Environment Variables

Set these in Vercel Dashboard > Project > Settings > Environment Variables:

```env
# Firebase Configuration
FIREBASE_API_KEY=AIzaSyC...your_actual_api_key
FIREBASE_AUTH_DOMAIN=ecowaste-india-qbrain.firebaseapp.com
FIREBASE_PROJECT_ID=ecowaste-india-qbrain
FIREBASE_STORAGE_BUCKET=ecowaste-india-qbrain.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters_long

# Server Configuration
NODE_ENV=production
FRONTEND_URL=https://your-project-name.vercel.app
PORT=3001
```

### 2.2 Security Rules

**Firestore Security Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Storage Security Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 3: Vercel Deployment

### 3.1 Deploy to Vercel

```bash
# Option 1: Automatic GitHub Integration
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

# Option 2: Manual Deployment
npm install -g vercel
vercel login
vercel --prod
```

### 3.2 Vercel Configuration

Create `vercel.json` (already exists):
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## Step 4: Domain Configuration

### 4.1 Firebase Authorized Domains
Add your Vercel domain to Firebase:
1. Firebase Console > Authentication > Settings > Authorized domains
2. Add: `your-project-name.vercel.app`

### 4.2 CORS Configuration
The server automatically allows Vercel domains, but verify in logs.

## Step 5: Testing Production

### 5.1 Verify Firebase Connection
Check server logs for:
```
✅ Firebase initialized with production configuration
```

### 5.2 Test Key Features
- [ ] User authentication
- [ ] Data persistence (create/read operations)
- [ ] File uploads to Storage
- [ ] API endpoints responding correctly

## Step 6: QBrain Branding

### 6.1 Custom Domain (Optional)
1. Purchase domain through your registrar
2. Add custom domain in Vercel dashboard
3. Update Firebase authorized domains
4. Update FRONTEND_URL environment variable

### 6.2 Branding Elements
- ✅ QBrain attribution in footer
- ✅ qbrain.in link in presentation
- ✅ AI-focused terminology throughout
- ✅ Modern gradient designs

## Troubleshooting

### Common Issues:

**1. Firebase Auth Errors:**
```
Solution: Check API key and authorized domains
```

**2. CORS Errors:**
```
Solution: Verify FRONTEND_URL environment variable
```

**3. Build Errors:**
```
Solution: Check all environment variables are set
```

**4. Database Permission Denied:**
```
Solution: Update Firestore security rules
```

## Support

For deployment support:
- 🌐 Visit: [qbrain.in](https://qbrain.in)
- 📧 Contact: QBrain Technologies
- 📚 Firebase Docs: [firebase.google.com/docs](https://firebase.google.com/docs)
- 📚 Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

---

**Developed by QBrain Technologies**  
Smart India Hackathon 2025 | AI-Powered Waste Management