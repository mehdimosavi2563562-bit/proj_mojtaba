import React from 'react';
import { ChevronDownIcon } from './Icons';

interface HeroProps {
  onFindYourFlavorClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onFindYourFlavorClick }) => {
  return (
    <div className="bg-kinders-light-gray">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-kinders-dark tracking-tight">
            SEASONINGS & RUBS
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-kinders-gray">
            From our family to yours, we're proud to share our line of seasonings and rubs,
            made with our favorite hand-picked ingredients for an unforgettable flavor.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
            <button 
              onClick={onFindYourFlavorClick}
              className="bg-kinders-red text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-colors duration-300 order-2 sm:order-1"
            >
              Find Your Flavor
            </button>
            <div className="flex items-center order-1 sm:order-2">
                <span className="text-sm font-medium text-kinders-gray mr-2">Sort by</span>
                <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm leading-5 focus:outline-none focus:ring-1 focus:ring-kinders-red focus:border-kinders-red">
                        <option>Featured</option>
                        <option>Best Selling</option>
                        <option>Alphabetically, A-Z</option>
                        <option>Alphabetically, Z-A</option>
                        <option>Price, low to high</option>
                        <option>Price, high to low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
