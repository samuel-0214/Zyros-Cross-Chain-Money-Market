import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';

const CrossChainAnimation: React.FC = () => {
  const { transactionStatus } = useWallet();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (transactionStatus.depositComplete && !transactionStatus.fundsReleased) {
      setShowAnimation(true);
    } else {
      setShowAnimation(false);
    }
  }, [transactionStatus]);

  if (!showAnimation) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]">
        {/* Solana to Base animation */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        </div>
        
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-xl">B</span>
          </div>
        </div>
        
        {/* Message path animation */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 600 300" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 150 C 250 50, 350 250, 500 150"
            stroke="url(#crossChainGradient)"
            strokeWidth="3"
            strokeDasharray="15 10"
            strokeLinecap="round"
            className="animate-dashOffset"
          />
          <defs>
            <linearGradient id="crossChainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#c026d3" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Animated message particle */}
        <div
          className={`absolute h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 animate-moveAlong ${
            transactionStatus.crossChainMessageSent ? 'animate-fadeOut' : ''
          }`}
          style={{
            filter: 'blur(1px)',
            animationDuration: '3s',
            animationIterationCount: 'infinite'
          }}
        />

        {transactionStatus.crossChainMessageSent && !transactionStatus.fundsReleased && (
          <div className="absolute right-24 top-1/2 transform -translate-y-1/2 animate-fadeInScale">
            <div className="h-12 w-12 rounded-full bg-yellow-500/70 flex items-center justify-center animate-ping">
              <span className="text-white font-bold text-xl">$</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrossChainAnimation;