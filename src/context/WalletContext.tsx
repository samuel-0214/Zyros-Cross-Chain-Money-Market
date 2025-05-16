import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WalletState, TransactionStatus } from '../types';
import { 
  DUMMY_SOLANA_ADDRESS, 
  DUMMY_BASE_ADDRESS, 
  INITIAL_SOL_BALANCE, 
  INITIAL_USDC_BALANCE, 
  INITIAL_ETH_BALANCE,
  TRANSACTION_TIMING,
  LTV_RATIO,
  TRANSACTION_REFERENCE
} from '../utils/constants';

interface WalletContextType {
  walletState: WalletState;
  transactionStatus: TransactionStatus;
  connectSolanaWallet: () => Promise<void>;
  connectBaseWallet: () => Promise<void>;
  depositCollateral: (amount: number) => Promise<void>;
  resetDemo: () => void;
  depositAmount: number;
  setDepositAmount: (amount: number) => void;
  borrowAmount: number;
}

const initialWalletState: WalletState = {
  solanaConnected: false,
  baseConnected: false,
  solanaAddress: '',
  baseAddress: '',
  solBalance: INITIAL_SOL_BALANCE,
  usdcBalance: INITIAL_USDC_BALANCE,
  ethBalance: INITIAL_ETH_BALANCE
};

const initialTransactionStatus: TransactionStatus = {
  depositComplete: false,
  crossChainMessageSent: false,
  fundsReleased: false,
  transactionId: undefined
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletState, setWalletState] = useState<WalletState>(initialWalletState);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(initialTransactionStatus);
  const [depositAmount, setDepositAmount] = useState<number>(100);
  
  const borrowAmount = depositAmount * LTV_RATIO;

  const connectSolanaWallet = async () => {
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, TRANSACTION_TIMING.walletConfirmation));
    
    setWalletState(prev => ({
      ...prev,
      solanaConnected: true,
      solanaAddress: DUMMY_SOLANA_ADDRESS
    }));
  };

  const connectBaseWallet = async () => {
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, TRANSACTION_TIMING.walletConfirmation));
    
    setWalletState(prev => ({
      ...prev,
      baseConnected: true,
      baseAddress: DUMMY_BASE_ADDRESS
    }));
  };

  const depositCollateral = async (amount: number) => {
    if (amount <= 0 || amount > walletState.usdcBalance) return;

    // Step 1: Deposit collateral
    await new Promise(resolve => setTimeout(resolve, TRANSACTION_TIMING.depositCompletion));
    
    setTransactionStatus(prev => ({
      ...prev,
      depositComplete: true
    }));
    
    setWalletState(prev => ({
      ...prev,
      usdcBalance: prev.usdcBalance - amount
    }));

    // Step 2: Cross-chain message
    await new Promise(resolve => setTimeout(resolve, TRANSACTION_TIMING.crossChainMessage));
    
    setTransactionStatus(prev => ({
      ...prev,
      crossChainMessageSent: true
    }));

    // Step 3: Funds released
    await new Promise(resolve => setTimeout(resolve, TRANSACTION_TIMING.fundsRelease));
    
    const borrowedAmount = amount * LTV_RATIO;
    
    setTransactionStatus(prev => ({
      ...prev,
      fundsReleased: true,
      transactionId: TRANSACTION_REFERENCE
    }));
    
    setWalletState(prev => ({
      ...prev,
      ethBalance: prev.ethBalance + borrowedAmount
    }));
  };

  const resetDemo = () => {
    setWalletState(initialWalletState);
    setTransactionStatus(initialTransactionStatus);
    setDepositAmount(100);
  };

  return (
    <WalletContext.Provider value={{
      walletState,
      transactionStatus,
      connectSolanaWallet,
      connectBaseWallet,
      depositCollateral,
      resetDemo,
      depositAmount,
      setDepositAmount,
      borrowAmount
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};