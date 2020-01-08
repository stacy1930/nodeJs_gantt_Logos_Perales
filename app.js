// Point d'entree

const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socker.io")(http);
