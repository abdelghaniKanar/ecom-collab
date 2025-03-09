import React from 'react';
import ProductCard from './ProductCard'
import Profile from './Profile';

const Home = () => {
  return (



    <div className="bg-stone-200 p-6 rounded-lg mt-10 mb-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
      <Navbar />
          <ProductCard />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
        </Routes>
        <Footer />

      </div>
    </div>
  );
};

export default Home;