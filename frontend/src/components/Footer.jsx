import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-500 text-white p-6 ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-stone-100 mb-3">boutique 101</h3>
            <p> &copy; 2025 boutique moderne. Tous droits réservés.</p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-3">Liens</h4>
            <ul>
              <li><Link to="/" className="text-gray-300 hover:text-yellow-400">Accueil</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-yellow-400">Panier</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <p className="text-gray-300">Email:boutique404@gmail.com</p>
            <p className="text-gray-300">Téléphone: +212 73 45 67 89</p>
          </div>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;