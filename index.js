'use strict';
const http = require("http");

const Produit = require("./entity/produit");
const Photo = require("./entity/photo");

const produit = new Produit('Apple', 'MacBookPro', 1999, [
	new Photo('photo1.jpg'),
	new Photo('photo2.jpg'),
	new Photo('photo3.jpg')
]);

const server = http.createServer((request, response) => {
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
});
server.listen(3000);