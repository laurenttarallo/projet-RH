const express = require("express");
const CompagnieModel = require("../models/compagnie.js");
const workerModel = require("../models/employe.js");
const compagnieRouter = express.Router();
const routeGuard = require("../customDependances/authGuard");
const upload = require("../customDependances/multer");
const crypto = require("../services/crypto");

compagnieRouter.get("/", async (req, res) => {
  try {
    res.render("template/login.twig");
  } catch (error) {
    res.send(error);
  }
});

// fonction asynchrone (qui ne s'execute pas en meme temps ) et derriere req (requete) , res (reponse)//
compagnieRouter.get("/compagnieReturn", async (req, res) => {
  try {
    res.redirect("/main");
    // res.render("main.twig");
  } catch (error) {
    res.send(err);
  }
});
//page de middle wear qui me permet de comparer la saisie du formulaire avec les compagnies dans ma BDD , et m'autoriser l'acces a la page suivante ou me renvoyer sur un message mdp non valide//
compagnieRouter.post("/login", async (req, res) => {
  try {
    let compagnie = await CompagnieModel.findOne({ mail: req.body.mail });
    if (compagnie) {
      if (await crypto.comparePassword(req.body.password, compagnie.password)) {
        req.session.compagnieId = compagnie._id;
        res.redirect("/workers");
      } else {
        throw "mdp non valide";
      }
    } else {
      throw "mail non valide";
    }
  } catch (err) {
    console.log(err);
res.send(err)
  }
});
// route qui me rend la page d'ajout de compagnie//
compagnieRouter.get("/addCompagnie", async (req, res) => {
  try {
    res.render("template/addCompagnie.twig");
  } catch (err) {
    res.send(err);
  }
});

// route pour saisir nom de compagnie + mot de passe crypté//
compagnieRouter.post("/addCompagnie", async (req, res) => {
  try {
    req.body.password = await crypto.cryptPassword(req.body.password);
    let compagnie = new CompagnieModel(req.body);
    compagnie.save();
    res.redirect("/");
  } catch (err) {
    res.send(err);
  }
});

//cherche la compagnie connectée par son ID de session, et recupere les id contenu dans le tableau du modele de la compagnie et recupere dans worker tout les employés appartenant aux id contenues dans CE tableau //
compagnieRouter.get("/workers", async (req, res) => {
  try {
    let compagnie = await CompagnieModel.findOne({_id: req.session.compagnieId,}).populate("workers")
    res.render("template/workers.twig",{
      workers: compagnie.workers
    })
  } catch (error) {
    console.log(error);
    res.send(error);
  }


});


// route pour avoir acces a ma page projet
// projetRouter.get("/addProject",routeGuard, async (req, res) => {
//   try {
//     res.render("addProject.twig");
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = compagnieRouter;







  // const worker = req.body;
  // const compagnie = await CompagnieModel.findOne({
  //   _id: req.session.compagnieId,
  // });
  // console.log(compagnie);
  // compagnie.workers.push(worker);
  // compagnie.save();
  // res.redirect("/workers");