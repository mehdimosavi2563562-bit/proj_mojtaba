
import React, { useState } from 'react';
import { SearchIcon, UserIcon, CartIcon, MenuIcon } from './Icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = ["SHOP", "RECIPES", "GRILLING TIPS", "OUR STORY"];

  return (
    <header className="border-b">
      <div className="bg-kinders-dark text-white text-center py-2 text-sm">
        <p>FREE SHIPPING ON ORDERS $49+</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon />
            </button>
            <div className="text-3xl font-extrabold tracking-tight text-kinders-red">
              KINDER'S
            </div>
          </div>

          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a
                href="#"
                key={link}
                className="text-sm font-semibold text-kinders-dark hover:text-kinders-red transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hover:text-kinders-red transition-colors">
              <SearchIcon />
            </button>
            <button className="hover:text-kinders-red transition-colors">
              <UserIcon />
            </button>
            <button className="hover:text-kinders-red transition-colors">
              <CartIcon />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="flex flex-col items-start p-4 space-y-4">
            {navLinks.map((link) => (
              <a
                href="#"
                key={link}
                className="text-sm font-semibold text-kinders-dark hover:text-kinders-red transition-colors w-full"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
