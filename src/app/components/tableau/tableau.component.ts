import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Reservation } from '../models/Reservation.model';
import { ReservationService } from '../services/Reservation.service';
import { ProfService } from '../services/prof.service';
import { SecuriteService } from '../services/securite.service';


@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {

  reservations: Reservation[] = [];
  selectedDate: Date | null = null;
  reserv : Reservation | undefined ;
  date_debute!: string;
  date_fine!: string;
  id_ClasseProf!: number;
  id_Sallee!: number;
  id_reservatione!: number;
  messageError : string | null =null;
  Situation : boolean = true ;

  constructor(private reservationService: ReservationService , private secuProf : ProfService , private secuSecu : SecuriteService ) {}

  ngOnInit(): void {
    this.reservationService.getAllReservation().subscribe({
      next: (data: Reservation[]) => {
       // this.reservations = data
        // Convertir date strings en Date
        this.reservations = data.map(r => ({
          ...r,
         date_debut: new Date(r.date_debut),
          date_fin: new Date(r.date_fin),


        }));
        console.log("Toutes les réservations récupérées :", this.reservations);

      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération :", err);
      }
    });
  }

  filteredReservations(): Reservation[] {
  if (!this.selectedDate) return [];

  const selectedStr = this.selectedDate.toISOString().split('T')[0];
  console.log("date est : ",selectedStr);


  return this.reservations.filter((r: Reservation) => {
    if (!r.date_debut) return false; // ignorer les réservations sans date
    const dateStr = new Date(r.date_debut).toISOString().split('T')[0];
    //const idSalle = r.salle.idSalle;

    return dateStr === selectedStr;
  });
}


  creationReservation(

  date_debute: string, // <-- string venant du ngModel
  date_fine: string,

  id_Sallee: number
): void {
  const nomProf = this.secuSecu.getNom();
  if (!this.date_debute || !this.date_fine) {
    this.messageError = "Veuillez sélectionner les deux dates (début et fin).";
    this.Situation = false;
    return;
  }

  const dateDebut = new Date(this.date_debute);
  const dateFin = new Date(this.date_fine);

  const dureeMs = dateFin.getTime() - dateDebut.getTime();
  const deuxHeuresMs = 1000 * 60 * 60 * 2;

  if (dureeMs > deuxHeuresMs) {
    this.messageError = "⏱️ La séance dépasse 2h, veuillez corriger ce temps.";
    this.Situation = false;
    return;
  }

  this.messageError = null;
  this.Situation = true;
  console.log("✅ Séance valide !");


  this.secuProf.getIDProfByName(nomProf).subscribe({
  next: (data: number) => {
    this.id_ClasseProf = data;
    console.log("✅ ID du professeur récupéré :", this.id_ClasseProf);
      const reserv: any = {

   date_debut: new Date(date_debute),
    date_fin: new Date(date_fine),
    classeprof: { idClasseProf: this.id_ClasseProf },
    salle: { id_Salle: id_Sallee }
  };
this.reservationService.createReservation(reserv).subscribe({
    next: (data: Reservation) => {
      console.log("✅ Réservation enregistrée avec succès :", data);
    },
    error: (err: any) => {
      console.error("❌ Erreur lors de l’enregistrement :", err , " reservation",reserv);
    }
  });
  },
  error: (err: any) => {
    console.error("❌ Erreur lors de la récupération de l'ID du professeur :", err);
  }
});




}


}
