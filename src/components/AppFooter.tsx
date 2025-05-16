import React from 'react';

const AppFooter: React.FC = () => {
  return (
    <div className="w-full mt-8 pt-4 border-t border-gray-800 text-center">
      <p className="text-gray-500 text-sm mb-1">
        This is a prototype MVP — smart contract logic in progress.
      </p>
      <p className="text-gray-600 text-xs flex items-center justify-center">
        <span className="inline-block h-2 w-2 rounded-full bg-purple-500 mr-1"></span>
        Solana
        <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mx-1 ml-2"></span>
        Base
        <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mx-1 ml-2"></span>
        Wormhole powered
      </p>
    </div>
  );
};

export default AppFooter;