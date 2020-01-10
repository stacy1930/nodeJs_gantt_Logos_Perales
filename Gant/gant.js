// On récupère ce que le client "dit"
const socket = io();
let title = "Aucun titre";
let description = "Aucune description";

socket.emit("connection", "a user connected");

// *******************TITRE******************
$("#addTitle").submit(function(e) {
  e.preventDefault();
  // if ($("#title").val() == "") {
  //   title = "Aucun titre";
  // } else {
  //   title = $("#title").val();
  // }
  socket.emit("title", $("#title").val());
  // $("#title").val("");
  return false;
});

$("#addTask").submit(function(e) {
  e.preventDefault();
  socket.emit("taskName", $("#tN").val());
  socket.emit("taskDesc", $("#tD").val());
  socket.emit("taskStart", $("#tS").val());
  socket.emit("taskEnd", $("#tE").val());
  socket.emit("task%", $("#tPP").val());
  socket.emit("taskColor", $("#tC").val());
  return false;
});

// *******************DESCRIPTION******************

// $("#addDesc").submit(function(e) {
//   e.preventDefault();
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
//   e.preventDefault();
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
//   e.preventDefault();

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
//   e.preventDefault();
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
//   e.preventDefault();

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
//   e.preventDefault();
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
$("#addTask").submit(function(e) {
  e.preventDefault();

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

  socket.emit("tN", $("#tN").val());
  $("#tN").val("");
  socket.emit("tD", $("#tD").val());
  $("#tD").val("");
  socket.emit("tS", $("#tS").val());
  $("#tS").val("");
  socket.emit("tE", $("#tE").val());
  $("#tE").val("");
  socket.emit("tPP", $("#tPP").val());
  $("#tPP").val("");
  socket.emit("tC", $("#tC").val());
  $("#tC").val("");
  return false;
});
