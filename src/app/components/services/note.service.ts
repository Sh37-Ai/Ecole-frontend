
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private url = 'http://localhost:8080/note';

  constructor(private http: HttpClient) {}

  getAllNote(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url);
  }

  getNoteByEleve(id : number | null): Observable<Note> {
    return this.http.get<Note>(`${this.url}/eleve/id/${id}`);
  }

  getNoteByEleveName(nom : string | null): Observable<Note> {
    return this.http.get<Note>(`${this.url}/eleve/${nom}`);
  }


}
