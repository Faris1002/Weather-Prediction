import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-white border-b-black border-b border-solid">
      <div className="max-w-[1440px] h-[72px] flex justify-between items-center mx-auto my-0 px-16 py-0 max-md:px-8 max-md:py-16 max-sm:px-4 max-sm:py-0">
        <div className="w-[84px] h-9 flex items-center">
          <Link to="/" aria-label="Home">
            <div dangerouslySetInnerHTML={{ __html: "<svg class='logo-svg'></svg>" }} />
          </Link>
        </div>
        
        <div className="flex items-center gap-8 max-sm:hidden">
          <Link to="/build" className="text-base text-black no-underline hover:text-gray-600">
            Build PC
          </Link>
          <Link to="/compatibility" className="text-base text-black no-underline hover:text-gray-600">
            Check Compatibility
          </Link>
          <Link to="/prices" className="text-base text-black no-underline hover:text-gray-600">
            See Prices
          </Link>
          <div className="flex items-center gap-1 cursor-pointer group">
            <span className="text-base text-black no-underline">More Info</span>
            <i className="ti ti-chevron-down group-hover:rotate-180 transition-transform" />
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            className="text-base cursor-pointer border text-black px-5 py-2 border-solid border-black hover:bg-gray-100 transition-colors max-sm:w-full"
            onClick={() => {/* Handle join */}}
          >
            Join
          </button>
          <button 
            className="text-base cursor-pointer border text-white bg-black px-5 py-2 border-solid border-black hover:bg-gray-800 transition-colors max-sm:w-full"
            onClick={() => {/* Handle start */}}
          >
            Start
          </button>
        </div>
      </div>
    </nav>
  );
};
