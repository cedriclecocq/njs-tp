'use strict';
const http = require("http");
const EventEmitter = require('events').EventEmitter;

module.exports = class Server extends EventEmitter {
	constructor(port, routeur) {
		super();
		this.port = port;
		this.routeur = routeur;
		this.server = http.createServer((request, response) => {
			console.time("request_duration");
			let callback = this.routeur.route(request);
			callback(request, response);
			console.timeEnd("request_duration");
			this.emit('request');
		});
		this.server.listen(this.port)
	}
}