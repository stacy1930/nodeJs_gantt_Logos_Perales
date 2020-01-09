// On récupère ce que le client "dit"
const socket = io();
let title = "Aucun titre";
let description = "Aucune description";
socket.emit("connection", "a user connected");

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

//A FINIR STACY
$("#addGroupTask").submit(function(e) {
  e.preventDefault();
  if ($("#gtN").val() == "") {
    groupTaskName = "Aucun nom";
  } else {
    groupTaskName = $("#gtN");
  }
});
