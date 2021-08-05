const express = require("express");
const router = express.Router();

const errors = [
  { status: 404, msg: "Ressource non trouvée" },
  {
    status: 501,
    msg: "Fonctionnalité réclamée non supportée par le serveur",
  },
  { status: 400, msg: "La syntaxe de la requête est erronée" },
  { status: 500, msg: "Erreur interne du serveur" },
  { status: 200, msg: "Requête traitée avec succès" },
];

router.get("/", (req, res) => {
  const error = errors[Math.floor(Math.random() * errors.length)];
  res.status(error.status).send({ ...error });
});

router.get("/:status", (req, res) => {
  const { status } = req.params;
  const error = errors.find((error) => error.status == status);

  res.status(status).send({ ...error });
});

module.exports = router;
