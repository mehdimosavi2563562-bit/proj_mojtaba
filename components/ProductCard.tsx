
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group text-center">
      <div className="overflow-hidden mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-lg font-bold text-kinders-dark">{product.name}</h3>
      <p className="text-sm text-kinders-gray">{product.tagline}</p>
      <p className="font-semibold my-2">{product.price}</p>
      <button className="bg-kinders-red text-white font-bold py-2 px-8 rounded-full hover:bg-red-700 transition-colors duration-300 transform group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
        Quick Add
      </button>
    </div>
  );
};

export default ProductCard;
