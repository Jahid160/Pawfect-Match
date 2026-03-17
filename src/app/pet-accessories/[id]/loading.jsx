import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center gap-4">
        
        <div className="border-4 border-orange-200 border-t-orange-500 rounded-full w-16 h-16 animate-spin"></div>
        <p className="font-bold text-gray-500 text-sm uppercase tracking-widest animate-pulse">
          Loading Gear...
        </p>
      </div>
    </div>
  );
};

export default Loading;