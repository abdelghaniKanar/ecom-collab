const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Route de connexion
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Email ou mot de passe invalide" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Email ou mot de passe invalide" });

    const token = user.generateAuthToken();
    
    res.status(200).send({
      token: token,
      role: user.role,  // 🔥 Assure-toi que le modèle User contient bien un champ "role"
      message: "Connexion réussie"
    });
  } catch (error) {
    res.status(500).send({ message: "Erreur interne du serveur" });
  }
});


// Validation avec Joi
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Mot de passe"),
  });
  return schema.validate(data);
};

module.exports = router;
