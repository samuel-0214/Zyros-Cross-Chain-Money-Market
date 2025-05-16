import React from 'react';
import { ChainTab } from '../types';

interface AppHeaderProps {
  activeTab: ChainTab;
  setActiveTab: (tab: ChainTab) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between mb-8">
      <div className="flex items-center mb-4 md:mb-0">
        {/* <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-teal-600 flex items-center justify-center mr-3">
          <span className="text-white font-bold">Z</span>
        </div> */}
        <h1 className="text-2xl font-bold text-white">Zyros</h1>
        <div className="ml-3 px-2 py-1 rounded-full bg-gray-800 text-xs text-gray-400">
          MVP Demo
        </div>
      </div>
      
      <div className="flex bg-gray-800 rounded-lg p-1">
        <button
          className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'solana'
              ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('solana')}
        >
          Solana Devnet
        </button>
        <button
          className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'base'
              ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('base')}
        >
          Base Sepolia
        </button>
      </div>
    </div>
  );
};

export default AppHeader;