
// import React from "react";
// import { useParams } from "react-router-dom";
// import products from "./productsData";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const product = products.find((p) => p.id === parseInt(id));

//   if (!product) {
//     return <p className="text-center text-red-500">Produit non trouvé.</p>;
//   }

//   // Find similar products (same category, excluding current product)
//   const similarProducts = products.filter(
//     (p) => p.category === product.category && p.id !== product.id
//   );

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* Product Details Section */}
//       <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start">
//         {/* Left: Product Image */}
//         <div className="md:w-1/2 w-full">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-96 object-cover rounded-lg"
//           />
//         </div>

//         {/* Right: Product Info */}
//         <div className="md:w-1/2 w-full md:pl-6 mt-6 md:mt-0">
//           <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
//           <p className="text-gray-600 mt-2">{product.description}</p>
//           <p className="text-xl font-bold mt-4">{product.price} €</p>
//           <p className="text-gray-700 mt-2">
//             {product.stock > 0 ? `En stock: ${product.stock}` : "Rupture de stock"}
//           </p>
//           <button className="mt-4 bg-stone-500 text-white py-2 px-4 rounded-lg hover:bg-stone-400 transition">
//             Ajouter au panier
//           </button>

//           {/* Review Section */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold">Laisser un avis</h3>
//             <textarea
//               className="w-full p-2 border rounded-lg mt-2"
//               rows="3"
//               placeholder="Écrivez votre avis ici..."
//             ></textarea>
//             <button className="mt-2 bg-stone-500 text-white py-2 px-4 rounded-lg hover:bg-stone-400 transition">
//               Soumettre
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Similar Products Section */}
//       {similarProducts.length > 0 && (
//         <div className="mt-12">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Produits similaires</h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {similarProducts.map((p) => (
//               <div key={p.id} className="bg-white rounded-lg shadow-lg p-4">
//                 <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-lg" />
//                 <h4 className="text-lg font-semibold mt-2">{p.name}</h4>
//                 <p className="text-gray-600">{p.price} €</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;


import React from "react";
import { useParams } from "react-router-dom";
import products from "./productsData";
import commentsData from "./commentsData";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p className="text-center text-red-500">Produit non trouvé.</p>;
  }

  // Get comments for this product
  const productComments = commentsData.filter((c) => c.productId === product.id);

  // Find similar products (same category, excluding current product)
  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Product Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start">
        {/* Left: Product Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 w-full md:pl-6 mt-6 md:mt-0">
          <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold mt-4">{product.price} €</p>
          <p className="text-gray-700 mt-2">
            {product.stock > 0 ? `En stock: ${product.stock}` : "Rupture de stock"}
          </p>
          <button className="mt-4 bg-stone-500 text-white py-2 px-4 rounded-lg hover:bg-stone-400 transition">
            Ajouter au panier
          </button>

          {/* Review Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Laisser un avis</h3>
            <textarea
              className="w-full p-2 border rounded-lg mt-2"
              rows="3"
              placeholder="Écrivez votre avis ici..."
            ></textarea>
            <button className="mt-2 bg-stone-500 text-white py-2 px-4 rounded-lg hover:bg-stone-400 transition">
              Soumettre
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Avis des clients</h3>
        {productComments.length > 0 ? (
          <ul>
            {productComments.map((comment) => (
              <li key={comment.id} className="border-b py-4">
                <p className="text-gray-800 font-semibold">{comment.username}</p>
                <p className="text-gray-600 text-sm">{comment.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun avis pour ce produit.</p>
        )}
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Produits similaires</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similarProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow-lg p-4">
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-lg" />
                <h4 className="text-lg font-semibold mt-2">{p.name}</h4>
                <p className="text-gray-600">{p.price} €</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
