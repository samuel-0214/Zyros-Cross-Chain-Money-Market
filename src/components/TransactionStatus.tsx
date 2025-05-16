import React from 'react';
import { useWallet } from '../context/WalletContext';

const TransactionStatus: React.FC = () => {
  const { transactionStatus, resetDemo } = useWallet();

  // Don't render if no transaction has been initiated
  if (!transactionStatus.depositComplete) {
    return null;
  }

  return (
    <div className="bg-opacity-20 bg-gray-900 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 w-full mt-6">
      <h3 className="text-white font-medium text-lg mb-4">Transaction Status</h3>

      <div className="space-y-4">
        <div className="flex items-center">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
            transactionStatus.depositComplete 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-700 text-gray-400'
          }`}>
            {transactionStatus.depositComplete ? '✓' : '1'}
          </div>
          <div>
            <h4 className={`font-medium ${
              transactionStatus.depositComplete ? 'text-white' : 'text-gray-400'
            }`}>
              Deposit Collateral on Solana
            </h4>
            {transactionStatus.depositComplete && (
              <p className="text-sm text-green-400 animate-fadeIn">
                Collateral successfully locked on Solana
              </p>
            )}
          </div>
        </div>

        <div className="w-0.5 h-6 bg-gray-700 ml-4"></div>

        <div className="flex items-center">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
            transactionStatus.crossChainMessageSent 
              ? 'bg-green-500 text-white' 
              : transactionStatus.depositComplete 
                ? 'bg-yellow-500/70 animate-pulse text-white' 
                : 'bg-gray-700 text-gray-400'
          }`}>
            {transactionStatus.crossChainMessageSent 
              ? '✓' 
              : transactionStatus.depositComplete 
                ? <span className="animate-pulse">→</span> 
                : '2'}
          </div>
          <div>
            <h4 className={`font-medium ${
              transactionStatus.crossChainMessageSent 
                ? 'text-white' 
                : transactionStatus.depositComplete 
                  ? 'text-yellow-300' 
                  : 'text-gray-400'
            }`}>
              Cross-Chain Message via Wormhole
            </h4>
            {transactionStatus.crossChainMessageSent && (
              <p className="text-sm text-green-400 animate-fadeIn">
                Message verified and delivered to Base
              </p>
            )}
            {!transactionStatus.crossChainMessageSent && transactionStatus.depositComplete && (
              <p className="text-sm text-yellow-300/70 animate-pulse">
                Transmitting message to Base...
              </p>
            )}
          </div>
        </div>

        <div className="w-0.5 h-6 bg-gray-700 ml-4"></div>

        <div className="flex items-center">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
            transactionStatus.fundsReleased 
              ? 'bg-green-500 text-white' 
              : transactionStatus.crossChainMessageSent 
                ? 'bg-yellow-500/70 animate-pulse text-white' 
                : 'bg-gray-700 text-gray-400'
          }`}>
            {transactionStatus.fundsReleased 
              ? '✓' 
              : transactionStatus.crossChainMessageSent 
                ? <span className="animate-pulse">$</span> 
                : '3'}
          </div>
          <div>
            <h4 className={`font-medium ${
              transactionStatus.fundsReleased 
                ? 'text-white' 
                : transactionStatus.crossChainMessageSent 
                  ? 'text-yellow-300' 
                  : 'text-gray-400'
            }`}>
              Funds Released on Base
            </h4>
            {transactionStatus.fundsReleased && (
              <p className="text-sm text-green-400 animate-fadeIn">
                ETH successfully released to your wallet
              </p>
            )}
            {!transactionStatus.fundsReleased && transactionStatus.crossChainMessageSent && (
              <p className="text-sm text-yellow-300/70 animate-pulse">
                Preparing to release funds...
              </p>
            )}
          </div>
        </div>
      </div>

      {transactionStatus.fundsReleased && (
        <div className="mt-6 p-4 border border-green-500/30 bg-green-900/20 rounded-lg flex flex-col items-center">
          <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">Borrow Successful!</h3>
          <p className="text-green-300 mt-1">ETH released on Base</p>
          <div className="text-sm text-gray-400 mt-3">
            Reference ID: <span className="font-mono">{transactionStatus.transactionId}</span>
          </div>
          {/* <button
            onClick={resetDemo}
            className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reset Demo
          </button> */}
        </div>
      )}
    </div>
  );
};

export default TransactionStatus;