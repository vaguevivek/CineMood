import React from 'react';
import { Movie } from '../types';

interface WatchlistProps {
  watchlist: Movie[];
  onRemove: (title: string) => void;
  onClear: () => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, onRemove, onClear }) => {
  return (
    <section className="mb-12 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">My Watchlist</h2>
        <button 
          onClick={onClear} 
          className="text-sm text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Clear watchlist"
        >
          Clear All
        </button>
      </div>
      <ul className="space-y-3">
        {watchlist.map(movie => (
          <li 
            key={movie.title}
            className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold text-white">{movie.title}</p>
              <p className="text-xs text-gray-400">{movie.year} &bull; {movie.genre}</p>
            </div>
            <button
              onClick={() => onRemove(movie.title)}
              className="text-gray-500 hover:text-red-500 transition-colors p-1"
              aria-label={`Remove ${movie.title} from watchlist`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Watchlist;