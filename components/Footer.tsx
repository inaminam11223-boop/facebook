
import React from 'react';

const Footer: React.FC = () => {
  const languages = [
    'English (UK)', 'Hausa', 'Français (France)', 'Português (Brasil)', 
    'Español', 'العربية', 'Bahasa Indonesia', 'Deutsch', '日本語', 'Italiano', 'हिन्दी'
  ];

  const links = [
    'Sign Up', 'Log In', 'Messenger', 'Facebook Lite', 'Video', 'Places', 'Games', 
    'Marketplace', 'Meta Pay', 'Meta Store', 'Meta Quest', 'Imagine with Meta AI', 
    'Instagram', 'Threads', 'Fundraisers', 'Services', 'Voting Information Centre', 
    'Privacy Policy', 'Privacy Centre', 'Groups', 'About', 'Create ad', 'Create Page', 
    'Developers', 'Careers', 'Cookies', 'AdChoices', 'Terms', 'Help', 'Contact uploading and non-users'
  ];

  return (
    <footer className="bg-white w-full py-6 sm:py-10 text-[#737373] text-xs">
      <div className="max-w-[980px] mx-auto px-4">
        {/* Languages */}
        <div className="flex flex-wrap items-center space-x-3 border-b border-gray-200 pb-2 mb-2">
          {languages.map((lang, idx) => (
            <a key={idx} href="#" className="hover:underline">{lang}</a>
          ))}
          <button className="bg-gray-100 border border-gray-300 px-2 font-bold text-gray-600 hover:bg-gray-200">+</button>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
          {links.map((link, idx) => (
            <a key={idx} href="#" className="hover:underline">{link}</a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-4">
          <p>Facebook © 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
