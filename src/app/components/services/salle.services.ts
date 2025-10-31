
import { salle } from '../models/salle.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({providedIn: 'root'})

export class salleService{
  constructor(private http : HttpClient){}
  private apiUrl = 'http://localhost:8080/Salle';

  getSalleById(id :number | null ): Observable<salle>{
    return this.http.get<salle>(`${this.apiUrl}/${id}`);

    }


  }
