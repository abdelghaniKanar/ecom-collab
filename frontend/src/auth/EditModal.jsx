import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import PropTypes from "prop-types"; // Importer PropTypes


const EditModal = ({ product, fetchProducts, closeModal }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi de la requête PUT avec l'ID correct
      await axios.put(`http://localhost:5000/api/products/${updatedProduct._id}`, updatedProduct);
      fetchProducts(); // Récupérer les produits après mise à jour
      closeModal(); // Fermer la modal
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
    }
  };

  return (
    <Modal isOpen onRequestClose={closeModal} className="bg-white p-4 border rounded w-1/3 mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Modifier le produit</h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            name="titre"
            value={updatedProduct.titre || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={updatedProduct.description || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantité</label>
          <input
            type="number"
            name="quantité"
            value={updatedProduct.quantité || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
          <input
            type="number"
            name="prix"
            value={updatedProduct.prix || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
          Mettre à jour le produit
        </button>
      </form>
    </Modal>
  );
};
EditModal.propTypes = {
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      titre: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      quantité: PropTypes.number.isRequired,
      prix: PropTypes.number.isRequired,
    }).isRequired,
    fetchProducts: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

export default EditModal;
