// Point d'entree

const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socker.io")(http);

// const Gant = require(path.join(_dirname, "Gant", "gantBdd.js"));

// Connexion a la bdd
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/bddGantt";

//Connexion a la bdd bddGant et creation de la collection
mongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("bddGantt");
  dbo.createCollection("gantt", function(err, res) {
    if (err) throw err;
    console.log("Collection Created!");
  });

  dbo.collection("gantt").find({}, function(err, result) {
    if (err) throw err;
    // console.log(result.pseudo + " " + result.message);
  });
});
