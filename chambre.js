'use strict';
class Chambre {
	constructor(numero, surface, capacite, nombreLits, tarifs) {
		this.numero = numero;
		this.surface = surface;
		this.capacite = capacite;
		this.nombreLits = nombreLits;
		this.tarifs = tarifs;
	}

	toString() {
		return `Chambre[numero:${this.numero}, surface:${this.surface}, capacite:${this.capacite}, nombreLits:${this.nombreLits}, tarifs:${this.tarifs}]`;
	}
}