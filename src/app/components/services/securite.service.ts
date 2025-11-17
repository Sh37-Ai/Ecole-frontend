import { Injectable } from '@angular/core';
import { Prof } from '../models/prof.model';


@Injectable({ providedIn: 'root' })
export class SecuriteService {
  private token: string | null = null;
  private id : number | null = null;
  private nom : string | null = null ;




  setToken(token: string) {
    this.token = token;
  }

  setNom(nome: string) {
    this.nom = nome;
  }



  getToken(): string | null {
    return this.token;
  }
 getNom(): string | null {
    return this.nom;
  }


  clearToken() {
    this.token = null;

    this.nom = null;
  }


}
