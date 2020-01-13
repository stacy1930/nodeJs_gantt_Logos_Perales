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
      workingHours: { start: Date.now(), end: Date.now() },
      task: [],
      groupTask: [{ name: "optional", start: Date.now(), end: Date.now() }],
      resources: [{ name: "Jérémy", cost: 500, type: "humain" }],
      milestones: [{ name: "jalon °1", date: Date.now() }]
    }
  ]
};

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
});

//  Connection
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

  // Suppression en BDD
  client.on("idToDelete", data => {
    mongoClient.connect(url, function(err, db) {
      if (err) console.log("SUPPRESSION");
      let dbo = db.db("bddGantt");
      console.log(data);
      dbo
        .collection("task")
        .deleteOne({ _id: new mongo.ObjectID(data) }, function(err, obj) {
          //on doit convertir notre id en ObjectID qui sera reconnu et accepté par mongo
          if (err) console.log("SUPPRESSION REQUETE");
          console.log("element suprimé");
        });
    });
  });
  // Fin Suppression

  // Modification
  client.on("taskToMod", data => {
    console.log(data);
    mongoClient.connect(url, function(err, db) {
      if (err) console.log("MODIFICATION");
      let dbo = db.db("bddGantt");
      let query = { _id: new mongo.ObjectID(data.idToMod) }; //on fait notre requete sur l'id du document, qui doit etre converti enObjectID
      let newValues = {
        $set: {
          name: data.name,
          desc: data.desc,
          start: data.start,
          end: data.end,
          pp: data.pp,
          color: data.color
        } // on prépare les valeurs à ajouter
      };
      console.log(data);
      dbo.collection("task").updateOne(query, newValues, function(err, obj) {
        if (err) console.log("MODIFICATION REQUETE");
        console.log("element modifieé");
      });
    });
  });
  // Fin de modification

  // Insert des taches dans notre objet qui sera envoyé plus tard
  mongoClient.connect(url, function(err, db) {
    if (err) console.log("ICI");
    let dbo = db.db("bddGantt");
    let id = 0;
    dbo
      .collection("task")
      .find({})
      .forEach(function(task) {
        client.emit("task", task);

        jsonGant.projects[0].task.push({
          id: id,
          name: task.name,
          desc: task.desc,
          start: task.start,
          end: task.end,
          percentageProgress: parseInt(task.pp, 10),
          color: task.color,
          linkedTask: [],
          ressources: []
        });
        id++;
      });
  });
  // Fin insert

  //************************************************************************************************************* */
  //***************************** */ CONNEXION AU SERVEUR CENTRAL *********************************************** */
  //************************************************************************************************************* */
  const socketClient = require("socket.io-client");
  let clientTest = socketClient.connect("http://51.15.137.122:18000/", {
    reconnect: true
  });
  console.log("server central connected");

  // Envoyer le service au centrale
  clientTest.emit("sendUpdate", jsonGant);
  // clientTest.on("errorOnProjectUpdate", data => console.log(data));

  clientTest.emit("getServices");
  clientTest.on("servicies", data => {
    data.forEach(element => {
      console.log(element);
      client.emit("recupGantt", element);
    });
  });
});

http.listen(3001);
