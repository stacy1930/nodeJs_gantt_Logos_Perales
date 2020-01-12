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

socket.on("recupGantt", data => {
  $("#recupGantt").append(data.nameService);

  console.log(data);
});
