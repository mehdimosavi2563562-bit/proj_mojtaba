import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import RecommenderModal from './components/RecommenderModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white font-sans text-kinders-dark">
      <Header />
      <main>
        <Hero onFindYourFlavorClick={() => setIsModalOpen(true)} />
        <ProductGrid />
      </main>
      <Footer />
      {isModalOpen && <RecommenderModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
