import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";

let firebase: FirebaseApp;
let auth: Auth;
let analytics: Analytics;

if (typeof window !== "undefined") {
  firebase = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-key",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-auth",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock-app",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "mock-measurement",
  });

  auth = getAuth(firebase);
  analytics = getAnalytics(firebase);
}

export { auth, analytics, firebase };
