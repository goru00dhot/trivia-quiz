import React from 'react';
import { HelpCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-6 w-6 text-white" />
          <span className="text-white text-xl font-bold">TRIVIA QUIZ</span>
        </div>
        <div className="space-x-6">
          <a href="#" className="text-white hover:text-purple-200">Home</a>
          <a href="#" className="text-white hover:text-purple-200">About</a>
          <a href="#" className="text-white hover:text-purple-200">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;