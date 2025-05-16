import React from 'react';
import { useWallet } from '../context/WalletContext';

const WalletConnect: React.FC = () => {
  const { walletState, connectSolanaWallet, connectBaseWallet } = useWallet();

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="bg-opacity-20 bg-purple-900 p-6 rounded-xl backdrop-blur-sm border border-purple-500/30 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center mr-3">
              <span className="text-white font-bold">S</span>
            </div>
            <h3 className="text-white font-medium">Solana Wallet</h3>
          </div>
          <div className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
            Devnet
          </div>
        </div>

        {!walletState.solanaConnected ? (
          <button
            onClick={connectSolanaWallet}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg text-white font-medium hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-purple-900/30"
          >
            Connect Phantom
          </button>
        ) : (
          <div className="bg-purple-900/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Connected:</span>
              <span className="text-white font-mono text-sm truncate max-w-[180px]">
                {walletState.solanaAddress.substring(0, 6)}...
                {walletState.solanaAddress.substring(walletState.solanaAddress.length - 4)}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-purple-700/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">SOL Balance:</span>
                <span className="text-white font-medium">{walletState.solBalance.toFixed(2)} SOL</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-400 text-sm">USDC Balance:</span>
                <span className="text-white font-medium">{walletState.usdcBalance.toFixed(2)} USDC</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-opacity-20 bg-blue-900 p-6 rounded-xl backdrop-blur-sm border border-blue-500/30 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center mr-3">
              <span className="text-white font-bold">B</span>
            </div>
            <h3 className="text-white font-medium">Base Wallet</h3>
          </div>
          <div className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
            Sepolia
          </div>
        </div>

        {!walletState.baseConnected ? (
          <button
            onClick={connectBaseWallet}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg text-white font-medium hover:from-blue-500 hover:to-teal-500 transition-all duration-200 shadow-lg shadow-blue-900/30"
          >
            Connect MetaMask
          </button>
        ) : (
          <div className="bg-blue-900/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Connected:</span>
              <span className="text-white font-mono text-sm truncate max-w-[180px]">
                {walletState.baseAddress.substring(0, 6)}...
                {walletState.baseAddress.substring(walletState.baseAddress.length - 4)}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-700/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">ETH Balance:</span>
                <span className="text-white font-medium">{walletState.ethBalance.toFixed(2)} ETH</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;