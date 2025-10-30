import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="relative bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 max-w-lg w-full m-4 text-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">About CineMood</h2>
        <div className="space-y-4 text-gray-300">
            <p>
                CineMood is an intelligent movie discovery platform designed to help you find your next favorite film. 
                Instead of browsing endless catalogs, simply describe what you're in the mood for.
            </p>
            <p>
                Whether you're looking for "a thought-provoking sci-fi movie with a twist ending" or "a lighthearted comedy set in Paris," 
                our advanced AI analyzes your prompt and provides personalized recommendations complete with a synopsis and an explanation of why it's the perfect match for you.
            </p>
            <p>
                Happy watching!
            </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AboutModal;