'use strict';
class Client {
	constructor(nom, prenom) {
		this.nom = nom;
		this.prenom = prenom;
	}

	toString() {
		return `Client[nom:${this.nom}, prenom:${this.prenom}]`;
	}
}