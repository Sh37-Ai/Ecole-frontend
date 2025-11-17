
import { Eleve } from '../models/eleve.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private apiUrl = 'http://localhost:8080/eleves';

  constructor(private http: HttpClient) { }

  // Récupérer un élève par son ID
  getEleveById(id: number  | null): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.apiUrl}/${id}`);
  }

  // Optionnel : Récupérer tous les élèves
  getAllEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl);
  }

  deleteEleve(id: number | null): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateEleve(id: number | null, eleve: Eleve | undefined): Observable<Eleve> {
     return this.http.put<Eleve>(`${this.apiUrl}/${id}`,eleve);
  }

  createEleve(eleve: {
    nom: string;
    prenom: string;
    adresse: string;
    telephone: string;
    classe: { id_classe: string  };
  }): Observable<Eleve> {
  return this.http.post<Eleve>(`${this.apiUrl}`, eleve);
  }





}
