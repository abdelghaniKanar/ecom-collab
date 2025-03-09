import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react"; 
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";


export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setImagePreview(`http://localhost:5000/${product.image}`);
  };

  const updateProduct = async () => {
    if (!editProduct) return;

    try {
      const updatedData = new FormData();
      updatedData.append("title", formData.title);
      updatedData.append("description", formData.description);
      updatedData.append("price", formData.price);
      updatedData.append("stock", formData.stock);
      

      if (imageFile) {
        updatedData.append("image", imageFile);
      }

      const response = await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === editProduct._id ? response.data.product : product
        )
      );

      setEditProduct(null);
    } catch (error) {
      console.error("Erreur lors de la modification du produit.", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  return (
    <div className="flex min-h-screen p-6 bg-gray-100" id="/">
      <div className="w-full max-w-6xl mx-auto">
        <header className="bg-white shadow-sm p-4 mb-4 rounded-lg">
          <h1 className="text-xl font-bold">Gestion des produits</h1>
        </header>

        <Card className="p-6 overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {["Titre", "Description", "Image", "Prix", "Stock", "Actions" , "Update AT"].map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const isLast = index === products.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={product._id}>
                    <td className={classes}>{product.title}</td>
                    <td className={classes}>{product.description}</td>
                    <td className={classes}>
                      <img src={`http://localhost:5000${product.image}`} alt={product.title} className="w-20 h-20 object-cover rounded" />
                    </td>
                    <td className={classes}>{product.price} €</td>
                    <td className={classes}>{product.stock}</td>
                    <td className={classes}>{product.
updatedAt}</td>


                    <td className={classes}>
  <div className="flex space-x-2">
    <button 
      className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-800 transition shadow-md w-32 justify-center"
      onClick={() => handleDelete(product._id)}
    >
      <TrashIcon className="w-4 h-4 mr-2" /> Supprimer
    </button>
    <button 
      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow-md w-32 justify-center"
      onClick={() => handleEditClick(product)}
    >
      <PencilIcon className="w-4 h-4 mr-2" /> Modifier
    </button>
  </div>
</td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        {/* MODAL D'ÉDITION */}
        {editProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Modifier le produit</h3>

              <input type="text" name="title" value={formData.title || ""} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <textarea name="description" value={formData.description || ""} onChange={handleInputChange} className="w-full p-2 border rounded"></textarea>
              <input type="number" name="price" value={formData.price || ""} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <input type="number" name="stock" value={formData.stock || ""} onChange={handleInputChange} className="w-full p-2 border rounded" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2" />
              {imagePreview && <img src={imagePreview} alt="Aperçu" className="w-32 h-32 mx-auto" />}

              <div className="mt-4 flex justify-end">
                <button onClick={() => setEditProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                  Annuler
                </button>
                <button onClick={updateProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
