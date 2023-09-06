'use strict';
const express = require('express');
const child_process = require("child_process");
const net = require("net");
const path = require("path");
const fs = require("fs");
const multer = require('multer');

const Produit = require("./entity/produit");
const Photo = require("./entity/photo");

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const upload = multer({dest: 'uploads/'});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.get('/', (request, response) => {
	const produit = new Produit('Apple', 'MacBookPro', 1999, [
		new Photo('photo1.jpg'),
		new Photo('photo2.jpg'),
		new Photo('photo3.jpg')
	]);
	response.render('index', {produit: produit});
})

app.get('/ping/:domain.html', (request, response) => {
	child_process.exec(`ping -c 4 ${request.params["domain"]}`, (error, stdout) => {
		if(error) {
			response.render('ping', {error: error, result: null});
		}
		else {
			response.render('ping', {error: null, result: stdout})
		}
	});
});

app.get('/whois/:domain.html', (request, response) => {
	let result = '';
	let client = net.createConnection(43, 'whois.nic.fr', () => {
		client.write(`${request.params["domain"]}\r\n`);
		client.end();
	});
	client.on("data", data => {
		result += data;
	});
	client.on('end', () => {
		response.render('whois', {result: result});
	});
});

app.get('/form-upload', (request, response) => {
	fs.readdir(path.join(__dirname, 'images'), (err, files) => {
		if(err) {
			console.error(err);
			response.render('form-upload', {fichiers: []});
		}
		else {
			response.render('form-upload', {fichiers: files});
		}
	});
})

app.post('/do-upload', upload.single('image'), (request, response) => {
	fs.rename(path.join(__dirname, request.file['path']),
		path.join(__dirname, 'images', request.file['originalname']),
		err => {
			if(err) {
				console.error(err);
			}
			response.redirect(301, '/form-upload');
		}
	);
})

app.use((request, response, next) => {
	response.status(404).send("Oups, page not found!");
});

app.use((err, request, response, next) => {
	console.error(err);
	response.status(500).send("Oups, server error!");
});

app.listen(3000, () => console.log("Listening on port 3000"));