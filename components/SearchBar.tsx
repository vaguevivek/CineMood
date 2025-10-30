import React from 'react';

interface SearchBarProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
)

const SearchBar: React.FC<SearchBarProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full shadow-lg backdrop-blur-md">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon />
            </div>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A lonely robot in a post-apocalyptic world..."
                className="w-full py-4 pl-12 pr-40 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded-full"
                disabled={isLoading}
                aria-label="Movie search input"
            />
            <button
                type="submit"
                disabled={isLoading}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full transition-opacity duration-300 text-sm flex items-center justify-center"
            >
                <span>Discover</span>
                <ArrowIcon />
            </button>
        </div>
    </form>
  );
};

export default SearchBar;