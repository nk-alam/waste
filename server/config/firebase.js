import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Validate required Firebase configuration in production
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN', 
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

let app, db, storage, auth;

// Check if we're in production and validate Firebase config
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
const hasValidConfig = requiredEnvVars.every(envVar => process.env[envVar]);

if (isProduction && !hasValidConfig) {
  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  throw new Error(`🚨 Production deployment requires Firebase configuration. Missing: ${missingVars.join(', ')}`);
}

try {
  // Initialize Firebase with real or demo config
  if (hasValidConfig) {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized with production configuration');
  } else {
    // Development fallback with demo config
    const demoConfig = {
      apiKey: 'demo-api-key-for-development',
      authDomain: 'qbrain-ecowaste-demo.firebaseapp.com',
      projectId: 'qbrain-ecowaste-demo',
      storageBucket: 'qbrain-ecowaste-demo.appspot.com',
      messagingSenderId: '123456789012',
      appId: '1:123456789012:web:qbrain-demo-app'
    };
    app = initializeApp(demoConfig);
    console.log('⚠️ Firebase initialized with demo configuration (development only)');
  }
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Initialize Firebase Storage
  storage = getStorage(app);
  
  // Initialize Firebase Auth
  auth = getAuth(app);
  
  // Connect to Firestore emulator in development if available
  if (!isProduction && process.env.FIRESTORE_EMULATOR_HOST) {
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log('🔧 Connected to Firestore emulator');
    } catch (error) {
      console.log('ℹ️ Firestore emulator not available, using production Firestore');
    }
  }
  
} catch (error) {
  if (isProduction) {
    console.error('🚨 Firebase initialization failed in production:', error.message);
    throw error; // Fail fast in production
  }
  
  console.warn('⚠️ Firebase initialization failed, using mock services for development:', error.message);
  
  // Mock implementations for development only
  db = {
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({ exists: false, data: () => ({}) }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
        delete: () => Promise.resolve()
      }),
      where: () => ({
        get: () => Promise.resolve({ docs: [] })
      }),
      add: () => Promise.resolve({ id: 'mock-id' }),
      get: () => Promise.resolve({ docs: [] })
    })
  };
  
  storage = {
    ref: () => ({
      put: () => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('https://via.placeholder.com/300') } })
    })
  };
  
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'mock-user' } }),
    createUserWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'mock-user' } }),
    signOut: () => Promise.resolve()
  };
}

export { db, storage, auth };
export default app;