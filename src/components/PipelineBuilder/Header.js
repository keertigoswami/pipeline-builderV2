// Header.js
import React from 'react';
//  import databaseLogo from 'assets/images.png'; // Replace with the path to your logo

const Header = () => {
  return (
    <div className="flex items-center p-4  text-white w-full bg-blue-400">
      <img src="asset/logo03.png" alt="Database Logo" className="h-12 w-12 mr-3" />
      <h1 className="text-xl font-bold">Pipeline Builder</h1>
    </div>
  );
};

export default Header;
