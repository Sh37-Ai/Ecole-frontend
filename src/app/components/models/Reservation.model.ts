export interface Reservation {
  id_reservation: number;
  horaire: string;
  ClasseProf: { id_ClasseProf: number };
  salle: { id_Salle: number };
}
