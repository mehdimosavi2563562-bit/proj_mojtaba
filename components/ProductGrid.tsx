
import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
