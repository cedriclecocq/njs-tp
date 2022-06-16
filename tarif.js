'use strict';
class Tarif {
	constructor(dateDebut, dateFin, tarifNuit) {
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.tarifNuit = tarifNuit;
	}

	toString() {
		return `Tarif[dateDebut:${this.dateDebut}, dateFin:${this.dateFin}, tarifNuit:${this.tarifNuit}]`;
	}
}