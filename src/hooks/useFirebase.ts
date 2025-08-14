import { useState, useEffect } from 'react';
import { firebaseService } from '../services/firebase';
import type { Firestore, Auth } from 'firebase/firestore';

declare global {
  const __app_id: string;
  const __firebase_config: string;
  const __initial_auth_token: string;
}

export const useFirebase = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [error, setError] = useState('');
  const [db, setDb] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

        if (Object.keys(firebaseConfig).length === 0) {
          setError("Firebase is not configured. Progress tracking will not work.");
          return;
        }

        const { auth: firebaseAuth, db: firebaseDb } = firebaseService.initialize(firebaseConfig);
        
        // Set the initialized instances in state
        setAuth(firebaseAuth);
        setDb(firebaseDb);

        // Set up auth state listener
        const unsubscribe = firebaseService.onAuthStateChanged((user) => {
          if (user) {
            setUserId(user.uid);
            setIsAuthReady(true);
          } else {
            setUserId(null);
            setIsAuthReady(false);
          }
        });

        // Attempt authentication
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          try {
            await firebaseService.signInWithCustomToken(__initial_auth_token);
          } catch (error: any) {
            console.error("Custom token sign-in failed:", error);
            if (error.code === 'auth/invalid-claims') {
              setError("Authentication failed: Invalid custom token.");
            } else {
              setError(`Authentication failed: ${error.message}. Attempting anonymous sign-in.`);
              await firebaseService.signInAnonymously();
            }
          }
        } else {
          await firebaseService.signInAnonymously();
        }

        return unsubscribe;
      } catch (error: any) {
        console.error("Firebase initialization failed:", error);
        setError(`Firebase initialization failed: ${error.message}`);
      }
    };

    const cleanup = initializeFirebase();
    return () => {
      cleanup?.then(unsubscribe => unsubscribe?.());
    };
  }, []);

  return {
    userId,
    isAuthReady,
    error,
    db,
    auth
  };
};