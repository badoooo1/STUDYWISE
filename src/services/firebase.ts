import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import type { FirebaseConfig } from '../types';

class FirebaseService {
  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;
  private db: Firestore | null = null;

  initialize(config: FirebaseConfig): { auth: Auth; db: Firestore } {
    if (this.app) {
      return { auth: this.auth!, db: this.db! };
    }

    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);

    return { auth: this.auth, db: this.db };
  }

  async signInWithCustomToken(token: string): Promise<void> {
    if (!this.auth) throw new Error('Auth not initialized');
    await signInWithCustomToken(this.auth, token);
  }

  async signInAnonymously(): Promise<void> {
    if (!this.auth) throw new Error('Auth not initialized');
    await signInAnonymously(this.auth);
  }

  onAuthStateChanged(callback: (user: any) => void): (() => void) {
    if (!this.auth) throw new Error('Auth not initialized');
    return onAuthStateChanged(this.auth, callback);
  }

  getAuth(): Auth {
    if (!this.auth) throw new Error('Auth not initialized');
    return this.auth;
  }

  getDb(): Firestore {
    if (!this.db) throw new Error('Database not initialized');
    return this.db;
  }
}

export const firebaseService = new FirebaseService();