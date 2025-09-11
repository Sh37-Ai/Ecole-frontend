import { Prof } from '../models/prof.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProfService{
  private currentProf: Prof | null = null;
  private apiUrl = 'http://localhost:8080/prof';

  constructor(private http: HttpClient) { }



  getProfById(id: number  | null) : Observable<Prof>{
    return this.http.get<Prof>(`${this.apiUrl}/${id}`);
  }


  setCurrentProf(prof: Prof) {
    this.currentProf = prof;
  }


  getCurrentProf(): Prof | null {
    return this.currentProf;
  }


}
