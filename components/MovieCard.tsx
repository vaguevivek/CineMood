import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist: (movie: Movie) => void;
  watchlist: Movie[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAddToWatchlist, watchlist }) => {
  const isInWatchlist = watchlist.some(item => item.title === movie.title);

  return (
    <div className="relative bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm flex flex-col h-full">
      <div className="flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
        <div className="flex items-center space-x-2 text-xs mb-4">
          <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full">{movie.year}</span>
          <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full">{movie.genre}</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed flex-grow pb-10">{movie.synopsis}</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => onAddToWatchlist(movie)}
          disabled={isInWatchlist}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/20 ${
            isInWatchlist
              ? 'bg-green-500/20 text-green-400 cursor-default'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white focus:ring-orange-500'
          }`}
          aria-label={isInWatchlist ? 'Added to watchlist' : 'Add to watchlist'}
        >
          {isInWatchlist ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Added</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Watchlist</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;