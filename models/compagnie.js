const mongoose = require("mongoose");
const EmployeModel = require("./employe");

const compagnieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pas de nom"],
  },
  siret: {
    type: Number,
    required: [true, "pas de numero"],
  },
  mail: {
    type: String,
    required: [true, "pas de mail"],
  },
  CEOName: {
    type: String,
    required: [true, "pas de nom"],
  },
  password: {
    type: String,
    required: [true, "pas de password"],
  },
  workers: {
    type:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "workers"
    }]
  }
});
//page qui affiche les inputs et les champs a remplir que l'on veut pour la creation de notre fiche d'entreprise//
const CompagnieModel = mongoose.model("Compagnies", compagnieSchema);

module.exports = CompagnieModel;
