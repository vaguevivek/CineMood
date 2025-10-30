import React from 'react';
import SearchBar from './SearchBar';

interface HeaderProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="w-full text-center py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight" style={{textWrap: 'balance'}}>
                Find Your Next Cinematic 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"> Obsession</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
                Just describe the movie you're looking for, and let our AI handle the rest.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
                <SearchBar {...props} />
            </div>
        </div>
    </header>
  );
};

export default Header;