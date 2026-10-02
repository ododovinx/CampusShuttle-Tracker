import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || '',
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || '',
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || '',
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || '',
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || '',
  appId: Constants.expoConfig?.extra?.firebaseAppId || '',
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId || '',
};

const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

let app;
if (isFirebaseConfigured && !getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const auth = isFirebaseConfigured ? getAuth(app) : null;
export const firestore = isFirebaseConfigured ? getFirestore(app) : null;
export const messaging = isFirebaseConfigured ? getMessaging(app) : null;

export const firebaseStatus = {
  configured: isFirebaseConfigured,
  projectId: firebaseConfig.projectId || 'not-configured',
};

export const getFirebaseStatus = () => firebaseStatus;

export const updateDriverLocation = async (uid, location) => {
  if (!firestore || !uid) {
    return false;
  }

  try {
    const { doc, setDoc } = await import('firebase/firestore');
    await setDoc(doc(firestore, 'driverLocations', uid), {
      uid,
      latitude: location.latitude,
      longitude: location.longitude,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.warn('Driver location sync failed:', error);
    return false;
  }
};

export const subscribeToAnnouncements = async () => {
  if (!firestore) {
    return [];
  }

  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const snapshot = await getDocs(collection(firestore, 'announcements'));
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  } catch (error) {
    console.warn('Announcement load failed:', error);
    return [];
  }
};

export default firebaseStatus;
