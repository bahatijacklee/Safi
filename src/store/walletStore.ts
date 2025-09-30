import { create } from 'zustand';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  setConnecting: (connecting: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: 0,
  isConnecting: false,
  
  connect: async () => {
    set({ isConnecting: true });
    
    try {
      // Placeholder for wallet connection logic
      // In real implementation, integrate with HashPack or Blade SDK
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        isConnected: true,
        address: '0x1234...5678',
        balance: 100.5,
        isConnecting: false,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      set({ isConnecting: false });
    }
  },
  
  disconnect: () => set({
    isConnected: false,
    address: null,
    balance: 0,
  }),
  
  setConnecting: (isConnecting) => set({ isConnecting }),
}));