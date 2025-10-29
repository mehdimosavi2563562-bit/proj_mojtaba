
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-kinders-light-gray text-kinders-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">SHOP</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">BBQ Sauces</a></li>
              <li><a href="#" className="hover:underline">Seasonings & Rubs</a></li>
              <li><a href="#" className="hover:underline">Marinades & Glazes</a></li>
              <li><a href="#" className="hover:underline">Dipping Sauces</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">LEARN</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Recipes</a></li>
              <li><a href="#" className="hover:underline">Grilling Tips</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
              <li><a href="#" className="hover:underline">Store Locator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">JOIN OUR FAMILY</h3>
            <p className="text-sm mb-4">Sign up for our newsletter to get the latest recipes, tips, and deals.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-kinders-red"
              />
              <button className="bg-kinders-red text-white font-bold px-4 py-2 rounded-r-md hover:bg-red-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Kinder's. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Replace with actual social icons if needed */}
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Pinterest</a>
            <a href="#" className="hover:underline">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
