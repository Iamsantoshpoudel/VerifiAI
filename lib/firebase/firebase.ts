// lib/firebase/firebase.ts
import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app";
import { getDatabase, type Database } from "firebase/database";

const getEnvValue = (nextPublicKey: string, fallbackKey: string): string => {
  return process.env[nextPublicKey] ?? process.env[fallbackKey] ?? "";
};

const getFirebaseConfig = (): FirebaseOptions | null => {
  const apiKey = getEnvValue("NEXT_PUBLIC_FIREBASE_API_KEY", "POUDELX_FIREBASE_API_KEY");
  const authDomain = getEnvValue("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "POUDELX_FIREBASE_AUTH_DOMAIN");
  const databaseURL = getEnvValue("NEXT_PUBLIC_FIREBASE_DATABASE_URL", "POUDELX_FIREBASE_DATABASE_URL");
  const projectId = getEnvValue("NEXT_PUBLIC_FIREBASE_PROJECT_ID", "POUDELX_FIREBASE_PROJECT_ID");
  const storageBucket = getEnvValue("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "POUDELX_FIREBASE_STORAGE_BUCKET");
  const messagingSenderId = getEnvValue("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "POUDELX_FIREBASE_MESSAGING_SENDER_ID");
  const appId = getEnvValue("NEXT_PUBLIC_FIREBASE_APP_ID", "POUDELX_FIREBASE_APP_ID");
  const measurementId = getEnvValue("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID", "POUDELX_FIREBASE_MEASUREMENT_ID");

  if (!apiKey || !authDomain || !databaseURL || !projectId || !appId) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  };
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

export function getDb(): Database | null {
  if (database) {
    return database;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const config = getFirebaseConfig();
  if (!config?.projectId || !config.databaseURL) {
    console.warn("Firebase is not configured. Skipping database initialization.");
    return null;
  }

  try {
    app = getApps().length ? getApp() : initializeApp(config);
    database = getDatabase(app);
    return database;
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    return null;
  }
}

export const db = getDb();
