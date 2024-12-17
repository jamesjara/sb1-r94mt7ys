import { 
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Trade } from '../types/trade';

const TRADES_COLLECTION = 'trades';

export const tradeService = {
  async getTrades(userId: string): Promise<Trade[]> {
    const tradesQuery = query(
      collection(db, TRADES_COLLECTION),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(tradesQuery);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdDate: (doc.data().createdDate as Timestamp).toDate(),
      boughtDate: (doc.data().boughtDate as Timestamp).toDate(),
      closedDate: doc.data().closedDate ? (doc.data().closedDate as Timestamp).toDate() : undefined,
    })) as Trade[];
  },

  async addTrade(userId: string, trade: Omit<Trade, 'id'>): Promise<Trade> {
    const tradeData = {
      ...trade,
      userId,
      createdDate: serverTimestamp(),
      boughtDate: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, TRADES_COLLECTION), tradeData);
    return {
      ...trade,
      id: docRef.id,
    };
  },

  async updateTrade(tradeId: string, trade: Partial<Trade>): Promise<void> {
    const tradeRef = doc(db, TRADES_COLLECTION, tradeId);
    await updateDoc(tradeRef, trade);
  },

  async deleteTrade(tradeId: string): Promise<void> {
    const tradeRef = doc(db, TRADES_COLLECTION, tradeId);
    await deleteDoc(tradeRef);
  },

  async closeTrade(tradeId: string): Promise<void> {
    const tradeRef = doc(db, TRADES_COLLECTION, tradeId);
    await updateDoc(tradeRef, {
      status: 'closed',
      closedDate: serverTimestamp(),
    });
  },
};