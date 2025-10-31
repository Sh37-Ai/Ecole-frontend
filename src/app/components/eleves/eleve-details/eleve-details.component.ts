import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EleveService } from '../../services/eleve.service';
import { ProfService } from '../../services/prof.service';
import { Eleve } from '../../models/eleve.model';

@Component({
  selector: 'app-eleve-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eleve-details.component.html',
  styleUrls: ['./eleve-details.component.css']
})
export class EleveDetailsComponent implements OnInit {

  eleve: Eleve | undefined;

  constructor(
    private route: ActivatedRoute,
    private eleveService: EleveService,
    private profService: ProfService,
    private
  ) { }

  ngOnInit() {
    const idStr = this.route.snapshot.paramMap.get('id');
    console.log('ID récupéré :', idStr);

    if (idStr !== null) {
      const id = Number(idStr);
      if (isNaN(id)) {
        console.error('ID invalide');
        return;
      }

      this.eleveService.getEleveById(id).subscribe((data) => {
        this.eleve = data;
      });
    } else {
      console.error('ID manquant dans la route');
    }
  }

  Delete(id: number | null) {
    if (id !== null) {
      this.eleveService.deleteEleve(id).subscribe({
        next: () => {
          console.log('Élève supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }

  update(id: number | null) {
    if (id !== null && this.eleve) {
      console.log('Détails de l\'élève:', this.eleve);
      this.eleveService.updateEleve(id, this.eleve).subscribe({
        next: () => {
          console.log('Élève modifié avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la modification :', err);
        }
      });
    }
  }

}
