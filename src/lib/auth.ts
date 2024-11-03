import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordReset,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { UserProfile } from './types';

export async function signUp(email: string, password: string, username: string): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  const userProfile: Partial<UserProfile> = {
    uid: userCredential.user.uid,
    email,
    username,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await setDoc(doc(db, 'users', userCredential.user.uid), {
    ...userProfile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return userCredential;
}

export async function signIn(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function sendPasswordReset(email: string): Promise<void> {
  return firebaseSendPasswordReset(auth, email);
}

export function signOut(): Promise<void> {
  return auth.signOut();
}