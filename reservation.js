'use strict';
class Reservation {
	constructor(chambre, client, dateDebut, dateFin, tarifPaye) {
		this.chambre = chambre;
		this.client = client;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.tarifPaye = tarifPaye;
	}

	toString() {
		return `Reservation[chambre:${this.chambre}, client:${this.client}, dateDebut:${this.dateDebut}, dateFin:${this.dateFin}, tarifPaye:${this.tarifPaye}]`;
	}
}