import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Trivia Quiz. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:text-purple-400 mx-2">Privacy Policy</a>
          <a href="#" className="hover:text-purple-400 mx-2">Terms of Service</a>
          <a href="#" className="hover:text-purple-400 mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;