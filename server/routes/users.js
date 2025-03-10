const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/leo", async (req, res) => {
  try {
    // Validation des entrées
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(409).send({ message: "L'utilisateur existe déjà" });

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Vérification du rôle admin et de la clé secrète
    if (req.body.role === "admin" && req.body.secretKey !== "SECRET_ADMIN_KEY") {
      return res.status(403).send({ message: "Clé secrète invalide" });
    }

    // Création de l'utilisateur
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).send({ message: "Erreur serveur" });
  }
});

// Validation avec Joi
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("Prénom"),
    lastName: Joi.string().required().label("Nom"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Mot de passe"),
    role: Joi.string().valid("client", "admin").required(),
    secretKey: Joi.string().allow(""),
  });
  return schema.validate(data);
};

module.exports = router;
