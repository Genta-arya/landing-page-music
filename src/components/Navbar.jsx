import React from 'react';
import Header from './Header';

const Navbar = () => {
  return (
    <nav className="absolute w-full top-0  bg-transparent p-4 z-10 ">
      <div className="max-w-md  px-20">
        <h1 className="text-white text-lg">Navbar</h1>
      </div>
    </nav>
  );
};

export default Navbar;
