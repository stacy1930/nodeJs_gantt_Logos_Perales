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
    '<div class="selectRadio"><input type="radio" class="radio" name="suppTask" value="' +
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
      "%</span><br></div>"
  );

  $("#modField").prepend(
    '<div class="selectRadio"><input type="radio" name="modTask" value="' +
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
      "%</span><br></div>"
  );
});

socket.on("recupGantt", data => {
  $("#recupGantt").append(
    '<div style="border: solid 4px rgba(122, 200, 212, 0.5); border-radius: 10px; box-shadow: 8px 8px 0px #aaa; width:79%; margin:auto; margin-bottom:2%;" id="' +
      data.nameService.replace(/\s+/g, "") +
      '"><h2 style="text-align:center;">' +
      data.nameService +
      "</h2><ul id='" +
      data.nameService.replace(/\s+/g, "") +
      "-list'></ul></div>"
  );
  data.projects[0].task.forEach(element => {
    let startListTS = element.start * 1000;
    let startListDate = new Date(startListTS);
    let startListDay = ("0" + startListDate.getDate()).slice(-2);
    let startListMonth = ("0" + (startListDate.getMonth() + 1)).slice(-2);
    let startListYear = startListDate.getFullYear();

    let endListTS = element.end * 1000;
    let endListDate = new Date(endListTS);
    let endListDay = ("0" + endListDate.getDate()).slice(-2);
    let endListMonth = ("0" + (endListDate.getMonth() + 1)).slice(-2);
    let endListYear = endListDate.getFullYear();
    $("#" + data.nameService.replace(/\s+/g, "") + "-list").append(
      "<li class='task' style='color:" +
        element.color +
        "'>" +
        "<span>Nom de la tache : " +
        element.name +
        " </span><ul>" +
        "<li>Description : " +
        element.desc +
        " </li>" +
        "<li>Date de début : " +
        startListDay +
        "-" +
        startListMonth +
        "-" +
        startListYear +
        " </li>" +
        "<li>Date de fin : " +
        endListDay +
        "-" +
        endListMonth +
        "-" +
        endListYear +
        " </li>" +
        "<li>Progression : " +
        element.percentageProgress +
        "%</li>" +
        "</ul></li>"
    );
  });

  console.log(data);
});
