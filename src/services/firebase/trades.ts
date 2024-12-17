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
  Timestamp,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Trade } from '../../types/trade';

const TRADES_COLLECTION = 'trades';

function mapFirestoreData(doc: DocumentData): Trade {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    createdDate: data.createdDate?.toDate() || new Date(),
    boughtDate: data.boughtDate?.toDate() || new Date(),
    closedDate: data.closedDate?.toDate(),
  };
}

export const tradeService = {
  async getTrades(userId: string): Promise<Trade[]> {
    const tradesQuery = query(
      collection(db, TRADES_COLLECTION),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(tradesQuery);
    return snapshot.docs.map(mapFirestoreData);
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
    await updateDoc(tradeRef, {
      ...trade,
      updatedAt: serverTimestamp(),
    });
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
      updatedAt: serverTimestamp(),
    });
  },
};