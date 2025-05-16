// Dummy wallet addresses
export const DUMMY_SOLANA_ADDRESS = '7g38kNVJP6bT47QFomkZeXSu5jQUSJMGq91TnJvH91Tn';
export const DUMMY_BASE_ADDRESS = '0x8B7a0e12D46C03e9530e3A5AD7b5D51cF88b7a29';

// Demo balances
export const INITIAL_SOL_BALANCE = 10.24;
export const INITIAL_USDC_BALANCE = 1000.00;
export const INITIAL_ETH_BALANCE = 0;

// Transaction simulation timing (in ms)
export const TRANSACTION_TIMING = {
  walletConfirmation: 1500,
  depositCompletion: 2000,
  crossChainMessage: 2500,
  fundsRelease: 2000,
};

// LTV ratio (Loan to Value)
export const LTV_RATIO = 0.75; // 75%

// Demo transaction reference
export const TRANSACTION_REFERENCE = 'zk45bF8cP2vYnXh12eX';