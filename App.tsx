import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import Loader from './components/Loader';
import Footer from './components/Footer';
import SearchHistory from './components/SearchHistory';
import Watchlist from './components/Watchlist';
import AboutModal from './components/AboutModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import { Movie } from './types';
import { findMovies } from './services/geminiService';

const HowItWorksCard: React.FC<{icon: React.ReactNode; title: string; children: React.ReactNode}> = ({ icon, title, children }) => (
  <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-start text-left backdrop-blur-sm">
    <div className="bg-white/10 p-3 rounded-lg mb-4 text-orange-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const HowItWorks = () => (
  <section className="py-20 text-center">
    <h2 className="text-4xl font-extrabold mb-4 text-white">How It Works</h2>
    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Discovering your next cinematic obsession is as simple as one, two, three.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <HowItWorksCard 
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>}
        title="1. Describe Your Mood"
      >
        Tell us what you're feeling, who you like, or what you've enjoyed before.
      </HowItWorksCard>
      <HowItWorksCard 
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
        title="2. AI Analyzes Your Taste"
      >
        Our advanced AI understands the nuances of cinema to find the perfect match.
      </HowItWorksCard>
      <HowItWorksCard 
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4" /></svg>}
        title="3. Get Instant Suggestions"
      >
        Receive a curated list of movies you're guaranteed to love.
      </HowItWorksCard>
    </div>
  </section>
);

const StarIcon = ({className}: {className: string}) => (
  <svg className={`w-6 h-6 ${className}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface TestimonialData {
  quote: string;
  author: string;
  title: string;
  rating: number;
  avatarGradient: string;
}

const testimonials: TestimonialData[] = [
  {
    quote: "Finally, an AI that knows what I want to watch. This is the future of movie discovery.",
    author: "Alex Chen",
    title: "Cinephile",
    rating: 4.5,
    avatarGradient: "from-cyan-400 to-blue-600"
  },
  {
    quote: "I'm notoriously picky, but this app nailed it on the first try. I've found so many hidden gems.",
    author: "Samantha Bee",
    title: "Weekend Watcher",
    rating: 5,
    avatarGradient: "from-green-400 to-teal-600"
  },
  {
    quote: "The recommendations are scarily accurate. It's like having a film buff friend in my pocket.",
    author: "Mikey Rhodes",
    title: "Film Student",
    rating: 4,
    avatarGradient: "from-pink-500 to-rose-500"
  },
  {
    quote: "My partner and I can never agree on a movie. This tool is our new relationship saver!",
    author: "Jessica Miller",
    title: "Date Night Planner",
    rating: 5,
    avatarGradient: "from-purple-500 to-indigo-600"
  },
  {
    quote: "I described a vague memory of a movie I saw as a kid, and it found it instantly. Pure magic.",
    author: "David Lee",
    title: "Nostalgia Seeker",
    rating: 4.5,
    avatarGradient: "from-amber-400 to-yellow-600"
  }
];

const Testimonial: React.FC<{testimonial: TestimonialData}> = ({ testimonial }) => (
  <section className="py-20">
    <div className="relative bg-white/5 rounded-2xl border border-white/10 p-10 md:p-16 max-w-4xl mx-auto text-center backdrop-blur-sm">
      <div className="flex justify-center mb-4">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          if (starValue <= testimonial.rating) {
            return <StarIcon key={index} className="text-orange-400" />;
          }
          if (starValue - 0.5 <= testimonial.rating) {
            return <StarIcon key={index} className="text-orange-400/50" />;
          }
          return <StarIcon key={index} className="text-gray-600" />;
        })}
      </div>
      <p className="text-2xl md:text-3xl font-medium italic text-white mb-8">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center justify-center space-x-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarGradient} flex items-center justify-center ring-2 ring-white/20`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <div>
          <p className="font-bold text-white">{testimonial.author}</p>
          <p className="text-sm text-gray-400">{testimonial.title}</p>
        </div>
      </div>
    </div>
  </section>
);


const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialData>(testimonials[0]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    // Set a random testimonial on initial load
    const randomIndex = Math.floor(Math.random() * testimonials.length);
    setCurrentTestimonial(testimonials[randomIndex]);

    // Load search history from localStorage
    try {
      const storedHistory = localStorage.getItem('movieSearchHistory');
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Could not parse search history from localStorage", e);
      localStorage.removeItem('movieSearchHistory');
    }

    // Load watchlist from localStorage
    try {
      const storedWatchlist = localStorage.getItem('movieWatchlist');
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    } catch (e) {
      console.error("Could not parse watchlist from localStorage", e);
      localStorage.removeItem('movieWatchlist');
    }
  }, []);

  const updateWatchlistInStorage = (updatedWatchlist: Movie[]) => {
    setWatchlist(updatedWatchlist);
    localStorage.setItem('movieWatchlist', JSON.stringify(updatedWatchlist));
  };

  const handleAddToWatchlist = useCallback((movieToAdd: Movie) => {
    const isAlreadyAdded = watchlist.some(movie => movie.title === movieToAdd.title);
    if (!isAlreadyAdded) {
      const updatedWatchlist = [...watchlist, movieToAdd];
      updateWatchlistInStorage(updatedWatchlist);
    }
  }, [watchlist]);

  const handleRemoveFromWatchlist = useCallback((titleToRemove: string) => {
    const updatedWatchlist = watchlist.filter(movie => movie.title !== titleToRemove);
    updateWatchlistInStorage(updatedWatchlist);
  }, [watchlist]);

  const handleClearWatchlist = useCallback(() => {
    updateWatchlistInStorage([]);
  }, []);

  const performSearch = useCallback(async (searchPrompt: string) => {
    setSearchPerformed(true);
    if (!searchPrompt.trim()) {
      setError("Please enter a description for the movie you want to find.");
      setMovies(null);
      return;
    }

    setPrompt(searchPrompt);
    setIsLoading(true);
    setError(null);
    setMovies(null);

    try {
      const results = await findMovies(searchPrompt);
      setMovies(results);

      const updatedHistory = [
        searchPrompt,
        ...searchHistory.filter(p => p.toLowerCase() !== searchPrompt.toLowerCase())
      ].slice(0, 5);

      setSearchHistory(updatedHistory);
      localStorage.setItem('movieSearchHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, I couldn't find movies right now. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchHistory]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    performSearch(prompt);
  }, [prompt, performSearch]);

  const handleHistoryClick = useCallback((historyPrompt: string) => {
    performSearch(historyPrompt);

  }, [performSearch]);

  const handleClearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('movieSearchHistory');
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>;
    }

    if (movies) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.title}-${index}`}
              movie={movie}
              onAddToWatchlist={handleAddToWatchlist}
              watchlist={watchlist}
            />
          ))}
        </div>
      );
    }
    
    return null; 
  };

  return (
    <div className="min-h-screen bg-[#0D111C] text-white font-sans flex flex-col">
      <div className="flex flex-col flex-grow items-center w-full">
        <Header 
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
          {searchHistory.length > 0 && (
            <SearchHistory
              history={searchHistory}
              onHistoryClick={handleHistoryClick}
              onClearHistory={handleClearHistory}
            />
          )}

          {searchPerformed ? (
            <section className="my-12">
               {watchlist.length > 0 && (
                <Watchlist 
                    watchlist={watchlist} 
                    onRemove={handleRemoveFromWatchlist} 
                    onClear={handleClearWatchlist} 
                />
              )}
              {renderContent()}
            </section>
          ) : (
            <>
              <HowItWorks />
              <Testimonial testimonial={currentTestimonial} />
            </>
          )}
        </main>
      </div>
      <Footer 
        onAboutClick={() => setIsAboutModalOpen(true)}
        onPrivacyClick={() => setIsPrivacyModalOpen(true)}
      />
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
    </div>
  );
};

export default App;