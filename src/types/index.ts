export interface WalletState {
  solanaConnected: boolean;
  baseConnected: boolean;
  solanaAddress: string;
  baseAddress: string;
  solBalance: number;
  usdcBalance: number;
  ethBalance: number;
}

export interface TransactionStatus {
  depositComplete: boolean;
  crossChainMessageSent: boolean;
  fundsReleased: boolean;
  transactionId?: string;
}

export type ChainTab = 'solana' | 'base';