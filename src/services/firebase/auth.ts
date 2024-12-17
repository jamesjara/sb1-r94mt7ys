import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import type { User } from '../../types/auth';

export const authService = {
  async signIn(email: string, password: string): Promise<User> {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return mapFirebaseUser(user);
  },

  async signUp(email: string, password: string, displayName: string): Promise<User> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    return mapFirebaseUser(user);
  },

  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  }
};

function mapFirebaseUser(user: FirebaseUser): User {
  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}