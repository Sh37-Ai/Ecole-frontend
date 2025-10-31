import { Component } from '@angular/core';
import { Reservation } from '../models/Reservation.model';
import { ReservationService } from '../services/Reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'] // <-- correction ici
})
export class ReservationComponent {

  constructor(private reservationSer: ReservationService) {}

  createReservation(
    id_reservation: number | undefined,
    id_ClasseProf: number | undefined,
    horaire: string | undefined,
    id_Salle: number | undefined
  ) {

    if (!id_reservation || !id_ClasseProf || !horaire || !id_Salle) {
      console.log("Tous les champs sont requis !");
      return;
    }

    // Bien typer l'objet
    const newReservation: Reservation = {
    id_reservation,
    horaire,
    ClasseProf: { id_ClasseProf },
    salle: { id_Salle }
  };

    this.reservationSer.createReservation(newReservation).subscribe({
      next: () => {
        console.log("Réservation créée");
      },
      error: (err) => {
        console.log("Réservation non créée", err);
      }
    });
  }
}
