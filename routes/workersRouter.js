const express = require("express");
const CompagnieModel = require("../models/compagnie.js");
const workerModel = require("../models/employe.js");
const workersRouter = express.Router();
const routeGuard = require("../customDependances/authGuard");
const upload = require("../customDependances/multer");

workersRouter.get("/addWorker", async (req, res) => {
  try {
    res.render("template/addWorkers.twig");
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

workersRouter.post("/addWorkers", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      req.body.photo = req.file.filename;
    }
    let NewWorker = new workerModel(req.body);
    await NewWorker.save();
    await CompagnieModel.updateOne(
      { _id: req.session.compagnieId },
      { $push: { workers: NewWorker._id } }
    );
    res.redirect("/workers");
  } catch (error) {
    res.send(error);
  }
});

//cherche moi un modele d'employé dont l'id correspond avec l'id en parametre de ma route
workersRouter.get("/update/:id", async (req, res) => {
  try {
    let worker = await workerModel.findOne({ _id: req.params.id });
    res.render("template/updateWorkers.twig", {
      worker: worker,
    });
  } catch (error) {
    res.send(error);
  }
});

workersRouter.post("/update/:id", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      req.body.photo = req.file.filename;
    }
    await workerModel.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/workers");
  } catch (error) {
    res.send(error);
  }
});

//route qui permet d'ajouter un blame a mon employé et il sera automatiquement effacé dès le 3 eme blame recu//
workersRouter.get("/blame/:id", routeGuard, async (req, res) => {
  try {
    let worker = await workerModel.findOne({ _id: req.params.id });
    worker.blame++;
    if (worker.blame >= 3) {
      res.redirect("/delete/" + req.params.id);
    } else {
      await workerModel.updateOne({ _id: req.params.id }, worker);
      res.redirect("/workers");
    }
  } catch (error) {
    res.send(error);
  }
});
// PUSH POUR AJOUTER UN USER ET PULL POUR L'EXCLURE!!!!
workersRouter.get("/delete/:id", upload.single("image"), async (req, res) => {
  try {
    await workerModel.deleteOne({ _id: req.params.id });
    await CompagnieModel.updateOne(
      { _id: req.session.compagnieId },
      { $pull: { workers: req.params.id } }
    );
    res.redirect("/workers");
  } catch (error) {
    res.send(error);
  }
});

module.exports = workersRouter;
