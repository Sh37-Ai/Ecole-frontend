import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Eleve } from '../models/eleve.model';
import { Prof } from '../models/prof.model';
import { ProfService } from '../services/prof.service';
import { EleveService } from '../services/eleve.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-FirstPage',
  templateUrl: './FirstPage.component.html',
  styleUrls: ['./FirstPage.component.css'],
  imports: [CommonModule, FormsModule]
})
export class FirstPageComponent {
  prof: Prof | undefined;
  eleve: Eleve | undefined;
  messageErreur: string | undefined;

  constructor(
    private router: Router,
    private eleveService: EleveService,
    private profService: ProfService
  ) {}

  CheckExistanceEleve(id: number | undefined, noms: string | undefined) {
    if (!id || !noms) {
      this.messageErreur = "ID ou nom manquant.";
      return;
    }



    this.profService.getProfById(id).subscribe((profData) => {
      if (profData && profData.nom === noms) {
        this.prof = profData;
        console.log("Bienvenue professeur !");

      } else {

        this.eleveService.getEleveById(id).subscribe({
          next: (eleveData) => {
              if (eleveData && eleveData.nom === noms) {
               this.eleve = eleveData;
                console.log("Bienvenue élève !");
         } else {
      this.messageErreur = "Utilisateur non trouvé ou nom incorrect.";
    }
       },
       error: (err) => {
         console.log(err);
      this.messageErreur = "Utilisateur non trouvé ou nom incorrect.";
  }
});

      }
    });
  }
}
