// On récupère ce que le client "dit"
const socket = io();
let title = "Aucun titre";
let description = "Aucune description";
let task = new Object();
let taskToMod = new Object();

socket.emit("connection", "a user connected");

// *******************TITRE******************
$("#addTitle").submit(function(e) {
  socket.emit("title", $("#title").val());

  return false;
});

// *******************TASK******************

$("#addTask").submit(function(e) {
  switch ("") {
    case $("#tN").val():
      $("#tN").val() = "Aucun nom";
      break;

    case $("#tD").val():
      $("#tD").val() = "Aucun nom";
      break;

    case $("#tS").val():
      $("#tS").val() = "Aucun nom";
      break;

    case $("#tE").val():
      $("#tE").val() = "Aucun nom";
      break;

    case $("#tPP").val():
      $("#tPP").val() = "Aucun nom";
      break;

    case $("#tC").val():
      $("#tC").val() = "Aucun nom";
      break;
  }
  task.name = $("#tN").val();
  task.desc = $("#tD").val();
  task.start = new Date($("#tS").val()).getTime() / 1000; // Conversion de la date en time stamp
  task.end = new Date($("#tE").val()).getTime() / 1000; // idem
  task.pp = $("#tPP").val();
  task.color = $("#tC").val();
  socket.emit("addTask", task);

  $("#tN").val("");
  $("#tD").val("");
  $("#tS").val("");
  $("#tE").val("");
  $("#tPP").val("");
  $("#tC").val("");
});

$("#suppTask").submit(function(e) {
  let idToDelete = $("input[name='suppTask']:checked").val();
  socket.emit("idToDelete", idToDelete);
});

$("#modTask").submit(function(e) {
  taskToMod.name = $("#mtN").val();
  taskToMod.desc = $("#mtD").val();
  taskToMod.start = new Date($("#mtS").val()).getTime() / 1000; // Conversion de la date en time stamp
  taskToMod.end = new Date($("#mtE").val()).getTime() / 1000; // idem
  taskToMod.pp = $("#mtPP").val();
  taskToMod.color = $("#mtC").val();
  taskToMod.idToMod = $("input[name='modTask']:checked").val();
  socket.emit("taskToMod", taskToMod);
});

socket.on("task", data => {
  console.log(data);
  let startTS = data.start * 1000;
  let startDate = new Date(startTS);
  let startDay = ("0" + startDate.getDate()).slice(-2);
  let startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
  let startYear = startDate.getFullYear();

  let endTS = data.end * 1000;
  let endDate = new Date(endTS);
  let endDay = ("0" + endDate.getDate()).slice(-2);
  let endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
  let endYear = endDate.getFullYear();

  $("#suppField").prepend(
    '<input type="radio" name="suppTask" value="' +
      data._id +
      '"><span style="color:' +
      data.color +
      '">Nom : ' +
      data.name +
      " || Description : " +
      data.desc +
      " || Start : " +
      startDay +
      "-" +
      startMonth +
      "-" +
      startYear +
      " || End : " +
      endDay +
      "-" +
      endMonth +
      "-" +
      endYear +
      " || Completion : " +
      data.pp +
      "%</span><br>"
  );

  $("#modField").prepend(
    '<input type="radio" name="modTask" value="' +
      data._id +
      '"><span style="color:' +
      data.color +
      '">Nom : ' +
      data.name +
      " || Description : " +
      data.desc +
      " || Start : " +
      startDay +
      "-" +
      startMonth +
      "-" +
      startYear +
      " || End : " +
      endDay +
      "-" +
      endMonth +
      "-" +
      endYear +
      " || Completion : " +
      data.pp +
      "%</span><br>"
  );
});

// *******************DESCRIPTION******************

// $("#addDesc").submit(function(e) {
//
//   if ($("#description").val() == "") {
//     description = "Aucune description";
//   } else {
//     description = $("#description").val();
//   }
//   socket.emit("description", description);
//   $("#description").val("");
//   return false;
// });

// *******************GROUPTASK******************
// $("#addGroupTask").submit(function(e) {
//
//   if ($("#gtN").val() == "") {
//     groupTaskName = "Aucun nom";
//   } else {
//     groupTaskName = $("#gtN");
//   }

//   if ($("#gtS").val() == "") {
//     groupTaskStart = "";
//   } else {
//     groupTaskStart = $("gtS");
//   }

//   if ($("#gtE").val() == "") {
//     groupTaskEnd = "";
//   } else {
//     groupTaskEnd = $("gtE");
//   }

//   socket.emit("gtN", groupTaskName);
//   $("#gtN").val("");
//   socket.emit("gtE", groupTaskEnd);
//   $("#gtE").val("");
//   socket.emit("gtS", groupTaskStart);
//   $("#gtS").val("");
//   return false;
// });

// VERSION PROPRE
// $("#addGroupTask").submit(function(e) {
//

//   switch ("") {
//     case $("#gtN").val():
//       $("#gtN").val() = "Aucun nom";
//       break;

//     case $("#gtS").val():
//       $("#gtS").val() = "Aucun nom";
//       break;

//     case $("#gtE").val():
//       $("#gtE").val() = "Aucun nom";
//       break;
//   }

//   socket.emit("gtN", $("#gtN"));
//   $("#gtN").val("");
//   socket.emit("gtE", $("#gtE"));
//   $("#gtE").val("");
//   socket.emit("gtS", $("#gtS"));
//   $("#gtS").val("");
//   return false;
// });

// *******************RESSOURCES******************
// $("#addResource").submit(function(e) {
//
//   if ($("#rN").val() == "") {
//     resourceName = "Aucun nom";
//   } else {
//     groupTaskName = $("#rN");
//   }

//   if ($("#rC").val() == "") {
//     resourceCost = "";
//   } else {
//     resourceCost = $("rC");
//   }

//   if ($("#rT").val() == "") {
//     resourceType = "";
//   } else {
//     resourceType = $("rT");
//   }
// });

// $("#addResource").submit(function(e) {
//

//   switch ("") {
//     case $("#rN").val():
//       $("#rN").val() = "Aucun nom";
//       break;

//     case $("#rC").val():
//       $("#gtS").val() = "Aucun nom";
//       break;

//     case $("#rT").val():
//       $("#rT").val() = "Aucun nom";
//       break;
//   }

//   socket.emit("rN", $("#rN"));
//   $("#rN").val("");
//   socket.emit("rE", $("#rE"));
//   $("#rE").val("");
//   socket.emit("rT", $("#rT"));
//   $("#rT").val("");
//   return false;
// });

// *******************MILESTONES******************

// $("#addMilestones").submit(function(e) {
//
//   if ($("#mN").val() == "") {
//     $("#mN").val() = "Aucun nom";
//   }

//   if ($("#mD").val() == "") {
//     $("#mD").val() = "Aucune date";
//   }

//   socket.emit("mN", $("#mN").val());
//   $("#mN").val("");
//   socket.emit("mD", $("#mD").val());
//   $("#mD").val("");
//   return false;
// });

// *******************RESSOURCES******************
