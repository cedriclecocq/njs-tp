'use strict';
class Hotel {
	constructor(nom, adresse, codePostal, ville) {
		this.nom = nom;
		this.adresse = adresse;
		this.codePostal = codePostal;
		this.ville = ville;
	}

	toString() {
		return `Hotel[nom:${this.nom}, adresse:${this.adresse}, codePostal:${this.codePostal}, ville:${this.ville}]`;
	}
}