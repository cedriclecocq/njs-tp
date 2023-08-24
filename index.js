'use strict';
const http = require("http");

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
</body>
</html>`;
	response.end(html);
})

const serv = new Server(8080, routeur);
serv.on('request', () => console.log("New request !"))
