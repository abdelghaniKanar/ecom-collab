import React from 'react';
import products from './productsData';
import { Link } from 'react-router';

const ProductCard = () => {

  return (

    products.map(product => (
      <>
      <h1 className="text-3xl font-semibold text-center text-stone-600 mb-6">Bienvenue sur votre meilleure boutique </h1> 
      <Link key={product.id} to={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-200">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-xl font-bold mt-4">{product.price} €</p>
            
            <button className="mt-4 text-stone-500 py-2 px-4 rounded-lg ">
              Voir les détails
            </button>
            <button
              className="mt-4 ml-1 bg-stone-500 text-white py-2 px-4 rounded-lg hover:bg-stone-400 transition"
            >
              Ajouter au panier
            </button>

          </div>
        </div></Link>
        </>
    ))

  );
};

export default ProductCard;