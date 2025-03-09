import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import ProductForm from './ProductForm';
import Navbar from './Navbar';

function AfeterLogIn() {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-200 h-screen fixed">
        <Navbar />
      </div>

      {/* Contenu Principal */}
      <div className="flex-1 p-10 ml-64">
        <Routes>
        <Route path="/ProductForm" element={<ProductForm />} />
        <Route path="/Admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default AfeterLogIn;
