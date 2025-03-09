import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { PlusCircleIcon, DocumentTextIcon, ShoppingCartIcon, ArrowDownCircleIcon } from "@heroicons/react/20/solid";

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleClick = async () => {
    if (!product.title || !product.description || !product.price || !product.stock) {
      setMessage("Tous les champs sont obligatoires."); 
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }); console.log("data", response)
      setProduct({ title: "", description: "", price: "", stock: "" }); 
      setImage(null); 
      setMessage("Produit ajouté avec succès !");
      setMessageType("success");

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("Errur d ajoute de produit",error);
      setMessageType("error");
      setTimeout(() => setMessage(""), 5000);
    }
  };
  return (
    <div className="bg-white border border-4 rounded-lg shadow relative m-10 p-6">
      {message && (
        <div className={`p-4 rounded-lg my-4 ${messageType === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
          {message}
        </div>
      )}

      <form className="space-y-4">
        <div className="flex items-center space-x-2">
          <PlusCircleIcon className="h-6 w-6 text-cyan-600" />
          <input
            type="text"
            name="title"
            placeholder="Nom du produit"
            onChange={handleChange}
            value={product.title}
            required
            className="border p-2 w-full"
         //   className={`border p-2 w-full ${errors.title ? "border-red-500 bg-red-100" : ""}`}

            
          />
        </div>

        <div className="flex items-center space-x-2">
          <DocumentTextIcon className="h-6 w-6 text-cyan-600" />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={product.description}
            className="border p-2 w-full"
          ></textarea>
        </div>

        <div className="flex items-center space-x-2">
          <ShoppingCartIcon className="h-6 w-6 text-cyan-600" />
          <input
            type="number"
            name="price"
            placeholder="Prix"
            onChange={handleChange}
            value={product.price}
            required
            className="border p-2 w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <ArrowDownCircleIcon className="h-6 w-6 text-cyan-600" />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange }
            value={product.stock}
            required
            className="border p-2 w-full"
          />
        </div>

        <div className="border p-4 rounded-md">
          <label className="block font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>

        <button
          type="button"
          className="bg-cyan-600 text-white px-4 py-2 rounded flex items-center"
          onClick={handleClick}
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Enregistrer
        </button>
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
};

export default ProductForm;
