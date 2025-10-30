import React from 'react';

const TwitterIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current h-5 w-5">
        <title>Twitter</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
);

const DribbbleIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current h-5 w-5">
        <title>Dribbble</title>
        <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zM3.424 15.151c.376.82.84 1.583 1.38 2.275l10.9-10.9c-.692-.54-1.455-1.004-2.275-1.38L3.424 15.15zm10.743 4.293c-2.433.52-4.982-.47-6.63-2.498l11.62-11.62c2.028 1.648 3.018 4.197 2.498 6.63l-7.488 7.488zM15.45 3.424c-.82-.376-1.683-.64-2.585-.77l.51 3.42 3.42.51c.13-.902-.14-1.765-.77-2.585z"/>
    </svg>
);

interface FooterProps {
    onAboutClick: () => void;
    onPrivacyClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAboutClick, onPrivacyClick }) => {
  return (
    <footer className="w-full border-t border-gray-800 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-500">&copy; 2025 CineMood. All rights reserved.</p>
                <div className="flex items-center space-x-6 text-sm">
                    <button onClick={onAboutClick} className="text-gray-400 hover:text-white transition-colors">About</button>
                    <button onClick={onPrivacyClick} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-white transition-colors">
                        <TwitterIcon />
                    </a>
                    <a href="#" aria-label="Dribbble" className="text-gray-500 hover:text-white transition-colors">
                        <DribbbleIcon />
                    </a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;