'use strict';
const http = require("http");

const Server = require("./server");

const serv = new Server(8080);
serv.on('request', () => console.log("New request !"))
