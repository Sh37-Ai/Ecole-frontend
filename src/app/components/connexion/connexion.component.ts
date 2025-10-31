import {Component, OnInit} from '@angular/core';


import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  // Correction du chemin relatif
import { ProfService } from '../services/prof.service';
import { LoginServices } from '../services/Login.services';
import { Prof } from '../models/prof.model';
import { Router } from '@angular/router';

import { SecuriteService } from '../services/securite.service';


@Component({
  selector: 'app-connexion',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {

  prof : Prof| undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ProfService: ProfService,
    private Loggin : LoginServices,
    private securi : SecuriteService
  ) { }

  getProf(id: number | null) {
  return this.ProfService.getProfById(id);

}
login(nom: string | null , motDePasse : string | null ): void{
  if(nom != null && motDePasse != null ){
    this.Loggin.connection(nom,motDePasse).subscribe({
      next  : (data : any) => {
        console.log("Token est ", data);
        this.securi.setToken(data.token);
        this.router.navigate(['/ListeEleve']);
        },
      error : (err : any) =>{
        console.log("Erreur", err);

        }
      })

    }


  }

verification(id: number | null, nom: string | null) {
  if (id !== null && nom !== null) {
    this.getProf(id).subscribe((data) => {
      this.prof = data;
      if (nom === this.prof?.nom) {
        console.log("Bienvenue");
        this.router.navigate(['/navigation']);
        this.ProfService.setCurrentProf(this.prof);

      } else {
        console.log("Vous vous êtes trompé");
      }
    });
  }
}






}
