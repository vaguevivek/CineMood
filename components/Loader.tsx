import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-10">
      <div className="w-12 h-12 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
      <p className="text-gray-400">Discovering your next cinematic obsession...</p>
    </div>
  );
};

export default Loader;