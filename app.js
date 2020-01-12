// Point d'entree

const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

const jsonGant = {
  nameService: "Perales_Logos",
  projects: [
    {
      name: "projet de test",
      desc: "Description du projet, blablabla...",
      daysOff: {
        Mo: true,
        Tu: true,
        We: true,
        Th: true,
        Fr: true,
        Sa: false,
        Su: false
      },
      workingHours: { start: Date.now, end: Date.now },
      task: [
        {
          id: 0,
          name: "tache 1",
          desc: "toto",
          start: 1491680626329,
          end: 1491684607029,
          percentageProgress: 50,
          color: "#fc0202",
          linkedTask: [],
          ressources: []
        },
        {
          id: 1,
          name: "tache 2",
          desc: "toto",
          start: 1491680626327,
          end: 1491684607022,
          percentageProgress: 10,
          color: "#fc0350",
          linkedTask: [],
          ressources: []
        }
      ],
      groupTask: [{ name: "optional", start: Date.now(), end: Date.now() }],
      resources: [{ name: "Jérémy", cost: 500, type: "humain" }],
      milestones: [{ name: "jalon °1", date: Date.now() }]
    }
  ]
};

// const Gant = require(path.join(__dirname, "Gant", "gant.js"));

app.use(express.static(path.join(__dirname, "Gant")));

// Connexion a la bdd
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/bddGantt";

// //Connexion a la bdd bddGant et creation de la collection
mongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("bddGantt");
  dbo.createCollection("gantt", function(err, res) {
    if (err) throw err;
    console.log("Collection Created!");
  });

  dbo.collection("gantt").find({}, function(err, result) {
    if (err) throw err;
    console.log("pas ok");
  });

  //  Connection
});

io.on("connection", client => {
  client.on("connection", data => console.log(data)); // Un utilisateur visite la page

  // Envoi d'une tache en bdd INSERTONE
  client.on("addTask", data => {
    console.log(data);
    mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db("bddGantt");
      dbo.collection("task").insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("document ajouté");
      });
    });
  });
  // fin Envoie de tache en bdd

<<<<<<< HEAD
  client.on("idToDelete", data => {
    mongoClient.connect(url, function(err, db) {
      if (err) console.log("SUPPRESSION");
      let dbo = db.db("bddGantt");
      console.log(data);
      dbo
        .collection("task")
        .deleteOne({ _id: new mongo.ObjectID(data) }, function(err, obj) {
          if (err) console.log("SUPPRESSION REQUETE");
          console.log("element suprimé");
        });
    });
  });

=======
  //RECUPERA5ION DES TACHES FIND
>>>>>>> 944e2340f029eb16989dd1d11058346e618d57a2
  mongoClient.connect(url, function(err, db) {
    if (err) console.log("ICI");
    let dbo = db.db("bddGantt");
    dbo
      .collection("task")
      .find({})
      .forEach(function(task) {
        client.emit("task", task);
      });
  });

  //SUPPRESSION D'UNE TACHE
  // mongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   let dbo = db.db("bddGantt");
  //   db.collection("task").deleteOne(data, function(err, res) {
  //     if (err) throw err;
  //     console.log("Document supprimé !");
  //   });
  // });

  //UPDATE D'UNE TACHE
  // mongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   let dbo = db.db("bddGantt");
  //   dbo.collection("task").updateOne(data, newValue, function(err, res) {
  //     if (err) throw err;
  //     console.log("Document modifié !");
  //   });
  // });

  //************************************************************************************************************* */
  //***************************** */ CONNEXION AU SERVEUR CENTRAL *********************************************** */
  //************************************************************************************************************* */

  const socketClient = require("socket.io-client");
  let clientTest = socketClient.connect("http://51.15.137.122:18000/", {
    reconnect: true
  });

  console.log("server central connected");
  //********DEMANDE D'AIDE******** */
  //Pour demander de l'aide
  clientTest.emit("needHelp");
  //Ecouter la reponse de demande d'aide
  clientTest.on("info", data => console.log(data));

  //********RECEVOIR L'ENSEMBLE DE TOUS LES PROJETS******** */
  // clientTest.on("projectUpdated", data => console.log(data));

  //********ECOUTER ET VOIR SI UNE ERREUR A EU LIEU LORS DE LA MAJ******** */
  // clientTest.on("errorOnProjectUpdate", data => console.log(data));

  //********DEMANDER AU CENTRALE DE RENVOYER LA LISTE DES SERVICES******** */
  clientTest.emit("getServices");
  clientTest.on("servicies", data => console.log(data));

  //********DEMANDER AU CENTRALE DE RENVOYER LA LISTE DES SERVICES******** */
  // clientTest.emit("deleteService");
});

http.listen(3001);
