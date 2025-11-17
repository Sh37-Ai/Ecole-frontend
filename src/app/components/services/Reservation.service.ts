import { Reservation } from '../models/Reservation.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class  ReservationService{
  private apiUrl = 'http://localhost:8080/Reservation';

  constructor(private http: HttpClient) { }

  getReservation(id:number) : Observable<Reservation>{
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
    }
   getAllReservation() : Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}`);
    }

  createReservation(newReservation:Reservation ): Observable<Reservation>{
    return this.http.post<Reservation>(`${this.apiUrl}`,newReservation);
    }

  }
