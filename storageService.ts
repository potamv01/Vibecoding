import { CardState } from '../types';

/**
 * Simulates saving a card to Firestore.
 * In a real application, this would import firebase/firestore and use addDoc.
 */
export const saveCardToFirestore = async (card: CardState): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Generate a mock ID
      const mockId = Math.random().toString(36).substring(2, 15);
      console.log("Mock saved to Firestore path /cards/" + mockId, card);
      
      // Store in local storage just so we can 'retrieve' it if we wanted to be fancy, 
      // but strictly for this demo, we just return the ID.
      try {
        const savedCards = JSON.parse(localStorage.getItem('saved_cards') || '{}');
        savedCards[mockId] = card;
        localStorage.setItem('saved_cards', JSON.stringify(savedCards));
      } catch (e) {
        console.warn("Local storage failed, but 'firestore' save succeeded in memory.");
      }

      resolve(mockId);
    }, 1500);
  });
};