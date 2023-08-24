'use strict';
const url = require("url");
const fs = require("fs");

let handlers = {'GET': {}, 'POST': {}, 'PUT': {}, 'DELETE': {}};

module.exports.get = function(path, callback) {
	handlers['GET'][path] = callback;
};
module.exports.post = function(path, callback) {
	handlers['POST'][path] = callback;
};
module.exports.put = function(path, callback) {
	handlers['PUT'][path] = callback;
};
module.exports.delete = function(path, callback) {
	handlers['DELETE'][path] = callback;
};

module.exports.route = function(request) {
	let urlObj = url.parse(request.url, true);
	let handler = handlers[request.method][urlObj.pathname];
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