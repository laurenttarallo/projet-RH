const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: [true, "Pas de photo"],
  },
  name: {
    type: String,
    required: [true, "Pas de nom"],
  },
  fonction: {
    type: String,
    required: [true, "Pas de fonction"],
  },

  blame: {
    type: Number,
    default: 0
  },
});
//page qui affiche les inputs et les champs a remplir que l'on veut pour la creation de notre fiche d'employés//
const workerModel = mongoose.model("workers", workerSchema);

module.exports = workerModel;
