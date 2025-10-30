import React from 'react';

interface SearchHistoryProps {
  history: string[];
  onHistoryClick: (prompt: string) => void;
  onClearHistory: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onHistoryClick, onClearHistory }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto -mt-4 mb-8">
      <div className="flex justify-between items-center mb-3 px-1">
        <h3 className="text-xs font-bold tracking-wider uppercase text-gray-500">Recent Searches</h3>
        <button 
          onClick={onClearHistory} 
          className="text-xs text-gray-500 hover:text-orange-500 transition-colors duration-200"
          aria-label="Clear search history"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <button
            key={item}
            onClick={() => onHistoryClick(item)}
            className="bg-white/5 text-gray-300 text-sm px-4 py-1.5 rounded-full border border-white/10 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;