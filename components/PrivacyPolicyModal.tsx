import React from 'react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">Privacy Policy</h2>
        <div className="space-y-4 text-gray-300 text-sm max-h-[60vh] overflow-y-auto pr-4">
            <p><strong>Last Updated:</strong> October 26, 2025</p>
            <p>
                At CineMood, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
            </p>
            <h3 className="font-bold text-white pt-2">Information We Collect</h3>
            <p>
                To enhance your experience, we may collect the following information:
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Search History:</strong> We store your search prompts locally on your device using your browser's localStorage. This is to provide you with a history of your recent searches for convenience. We do not transmit this history to our servers.</li>
                    <li><strong>Watchlist:</strong> Movies you add to your watchlist are also stored locally on your device using localStorage. This ensures your watchlist persists between sessions.</li>
                </ul>
            </p>
            <h3 className="font-bold text-white pt-2">How We Use Your Information</h3>
            <p>
                The information collected is used solely to provide and improve the app's features:
                 <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>To display your recent searches and saved watchlist.</li>
                    <li>To understand usage patterns and improve the user experience (note: no personal data is used for this).</li>
                </ul>
            </p>
             <h3 className="font-bold text-white pt-2">Third-Party Services</h3>
            <p>
                We use the Google Gemini API to generate movie recommendations. Your search prompts are sent to Google's servers to be processed. We recommend reviewing Google's Privacy Policy to understand how they handle data. We do not send any other personal information to Google.
            </p>
            <h3 className="font-bold text-white pt-2">Data Security</h3>
            <p>
                Since your search history and watchlist are stored locally on your device, you have full control. Clearing your browser's cache or local storage will permanently delete this information. We do not have access to this data.
            </p>
            <h3 className="font-bold text-white pt-2">Changes to This Policy</h3>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
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

export default PrivacyPolicyModal;