// Point d'entree

const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

const jsonGant = {
  nameService: "Demo",
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
      workingHours: { start: moment().hour(), end: moment().hour() },
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
    console.log("pas ok");
  });

  // //Connection
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("bddGantt");
    // if (data) {
    //   // var tab = data.split(":");
    //   // var myobj = { pseudo: tab[0], message: tab[1] };
    //   console.log(myobj);
    //   dbo.collection("message").insertOne(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     ServerEvent.emit("message");
    //     // db.close();
    //   });
    // }
  });
});

io.on("connection", gant => {
  gant.on("connection", data => console.log(data));
});

io.on("title", data => console.log(data));

http.listen(3001);
