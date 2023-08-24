'use strict';
const http = require("http");
const child_process = require("child_process");
const url = require("url");

const Server = require("./server");
const routeur = require('./routeur');

const Produit = require("./entity/produit");
const Photo = require("./entity/photo");

routeur.register('/', (request, response) => {
	const produit = new Produit('Apple', 'MacBookPro', 1999, [
		new Photo('photo1.jpg'),
		new Photo('photo2.jpg'),
		new Photo('photo3.jpg')
	]);

	let html = `
<html>
<head>
  <meta charset="UTF-8">
  <title>TP de la formation NJS</title>
</head>
<body>
  <p>Produit ${produit.nom} de chez ${produit.marque}</p>
  <img src="qualite.png">
</body>
</html>`;
	response.end(html);
})

routeur.register('/ping', (request, response) => {
	let urlObj = url.parse(request.url, true);
	if(urlObj.query["domain"]) {
		child_process.exec(`ping -c 4 ${urlObj.query["domain"]}`, (error, stdout) => {
			response.write("<html><head><title>Ping</title></head><body>");
			if(error) {
				response.write(error.message);
			}
			else {
				response.write(`<pre>${stdout}</pre>`);
			}
			response.end("</body></html>");
		});
	}
	else {
		response.end("<html><head><title>Ping</title></head><body>Domain ??</body></html>");
	}
});

const serv = new Server(8080, routeur);
serv.on('request', () => console.log("New request !"))
