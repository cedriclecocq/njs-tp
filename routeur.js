'use strict';
const url = require("url");

let handlers = {};

module.exports.register = function(path, callback) {
	handlers[path] = callback;
};

module.exports.route = function(request) {
	let urlObj = url.parse(request.url, true);
	let handler = handlers[urlObj.pathname];
	if(!handler) {
		handler = (request, response) => {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end("No route registered for " + urlObj.pathname);
		};
	}
	return handler;
};

module.exports.clear = function () {
	handlers = {};
};