'use strict';
const url = require("url");
const fs = require("fs");

let handlers = {};

module.exports.register = function(path, callback) {
	handlers[path] = callback;
};

module.exports.route = function(request) {
	let urlObj = url.parse(request.url, true);
	let handler = handlers[urlObj.pathname];
	if(!handler) {
		let potentialFilePath = __dirname + "/public" + urlObj.pathname;
		try {
			let data = fs.readFileSync(potentialFilePath);
			handler = (request, response) => {
				response.writeHead(200);
				response.end(data);
			};
		}
		catch (e) {
			handler = (request, response) => {
				response.writeHead(404, {'Content-Type': 'text/plain'});
				response.end("No route registered for " + urlObj.pathname);
			};
		}
	}
	return handler;
};

module.exports.clear = function () {
	handlers = {};
};