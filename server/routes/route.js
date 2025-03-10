const express = require("express");
const multer = require("multer");
const path = require("path");
const Produit = require("../model"); // Import du modèle MongoDB

const route = express.Router();

// 📂 Configuration Multer pour l'upload des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));   },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

// 🚀 Route pour récupérer tous les produits
route.get("/products", async (req, res) => {
  try {
    const products = await Produit.find(); // Récupérer tous les produits depuis MongoDB
    res.status(200).json(products); // Renvoie la liste des produits
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des produits" });
  }
});

route.post("/products", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Produit({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: req.file ? `/uploads/${req.file.filename}` : "", // Vérifie si l'image est présente
    });

    await newProduct.save();
    res.status(201).json({ message: "Produit ajouté avec succès", product: newProduct });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    res.status(500).json({ error: error.message });
  }
});
route.delete('/products/:id', async (req, res) => {
  try {
      const id=req.body 
      await Produit.deleteOne(id);
      res.send("Tâche supprimée avec succès");
  } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});
route.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;
    const updateData = { title, description, price, stock };

    // Si une nouvelle image est téléchargée, on ajoute son chemin
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Produit.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({
      message: "Produit mis à jour avec succès",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du produit" });
  }
});

module.exports = route;
