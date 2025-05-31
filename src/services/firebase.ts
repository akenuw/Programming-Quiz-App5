// Firebase configuration - DEMO MODE
// The app is currently running in demo mode with mock authentication
// To enable real Firebase authentication:
// 1. Follow the setup instructions in FIREBASE_SETUP.md
// 2. Replace the placeholder config below with your actual Firebase config
// 3. Update src/hooks/useAuth.ts to use real Firebase auth instead of mock

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Placeholder Firebase configuration
// Note: Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project-id",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Initialize Firebase (currently not used in demo mode)
let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.log('Firebase not configured - running in demo mode');
  // Mock exports for demo mode
  auth = null as any;
  db = null as any;
}

export { auth, db };
export default app;
