// On récupère ce que le client "dit"
const socket = io();
let title = "Aucun titre";
let description = "Aucune description";
socket.emit("connection", "a user connected");

// *******************TITRE******************
$("#addTitle").submit(function(e) {
  e.preventDefault();
  if ($("#title").val() == "") {
    title = "Aucun titre";
  } else {
    title = $("#title").val();
  }
  socket.emit("title", title);
  $("#title").val("");
  return false;
});

// *******************DESCRIPTION******************

$("#addDesc").submit(function(e) {
  e.preventDefault();
  if ($("#description").val() == "") {
    description = "Aucune description";
  } else {
    description = $("#description").val();
  }

  $("#description").val("");
  return false;
});

// *******************GROUPTASK******************
$("#addGroupTask").submit(function(e) {
  e.preventDefault();
  if ($("#gtN").val() == "") {
    groupTaskName = "Aucun nom";
  } else {
    groupTaskName = $("#gtN");
  }

  if ($("#gtS").val() == "") {
    groupTaskStart = "";
  } else {
    groupTaskStart = $("gtS");
  }

  if ($("#gtE").val() == "") {
    groupTaskEnd = "";
  } else {
    groupTaskEnd = $("gtE");
  }
});

// *******************RESSOURCES******************
$("#addResource").submit(function(e) {
  e.preventDefault();
  if ($("#rN").val() == "") {
    resourceName = "Aucun nom";
  } else {
    groupTaskName = $("#rN");
  }

  if ($("#rC").val() == "") {
    resourceCost = "";
  } else {
    resourceCost = $("rC");
  }

  if ($("#rT").val() == "") {
    resourceType = "";
  } else {
    resourceType = $("rT");
  }
});
