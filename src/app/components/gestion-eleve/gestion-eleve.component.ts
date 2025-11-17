import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Eleve } from '../models/eleve.model';
import { EleveService } from '../services/eleve.service';
import { salleService } from '../services/salle.services';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';
import { salle } from '../models/salle.model';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-gestion-eleve',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './gestion-eleve.component.html',
  styleUrls: ['./gestion-eleve.component.css']
})
export class GestionEleveComponent implements OnInit {

  ListeEleve: Eleve[] = [];
  sall: salle | undefined;
  notee: Note | undefined;
  situation : boolean = false ;
  situationErreur : boolean = false ;

  displayedColumns: string[] = [
    'ideleve', 'nom', 'prenom', 'telephone', 'adresse', 'classe_id','Notes','action'
  ];

  constructor(
    private eleveService: EleveService,
    private route: Router,
    private salleServicee: salleService,
    private noteserv: NoteService
  ) {}

  ngOnInit() {
    this.loadEleves();
  }

  loadEleves(): void {
    this.eleveService.getAllEleves().subscribe({
      next: (data: any[]) => {
        // Normalisation pour toujours avoir ideleve
        this.ListeEleve = data.map((e: any) => ({
          ideleve: e.ideleve ?? e.id_eleve,
          nom: e.nom,
          prenom: e.prenom,
          adresse: e.adresse,
          telephone: e.telephone,
          classe: e.classe
        }));
        console.log("Liste des élèves : ", this.ListeEleve);
      },
      error: (err) => console.error(err)
    });
  }

  Suppression(id: number | undefined) {
    if (id != null) {
      this.eleveService.deleteEleve(id).subscribe({
        next: () => console.log("Élève supprimé"),
        error: (err) => console.log("Élève non supprimé", err)
      });
    } else {
      console.log("Élève non supprimé : ID manquant");
    }
  }

  update(
    IDInput: HTMLInputElement,
    nom: string | undefined,
    prenom: string | undefined,
    telephone: string | undefined,
    adresse: string | undefined,
    classe_id: string | undefined
  ) {
    if (!nom || !prenom || !telephone || !adresse || !classe_id) {
      console.log("Tous les champs sont requis !");
      return;
    }
    const id = Number(IDInput.value?.trim());

    const newEleve: Eleve = {
      ideleve: id,
      nom,
      prenom,
      telephone,
      adresse,
      classe: { id_classe: classe_id }
    };

    this.eleveService.updateEleve(id, newEleve).subscribe({
      next: () => console.log("Modification faite !"),
      error: () => console.log("Erreur lors de la modification")
    });
  }

  Navigation(id: number | null) {
    if (id == null) return;
    this.route.navigate(['/tableau']);
    this.salleServicee.getSalleById(id).subscribe({
      next: (data: salle) => {
        this.sall = data;
        console.log("Bien vu", data);
      },
      error: () => console.log("Problème lors de la récupération de la salle")
    });
  }

  Navigationn() {
    this.route.navigate(['/maps']);
  }

  ajouter(
    nom: string | undefined,
    prenom: string | undefined,
    telephone: string | undefined,
    adresse: string | undefined,
    classe_id: string | undefined
  ) {
    if (!nom || !prenom || !telephone || !adresse || !classe_id) {
      console.log("Tous les champs sont requis !");
      return;
    }

    const eleveToCreate = {
      nom,
      prenom,
      telephone,
      adresse,
      classe: { id_classe: classe_id }
    };

    this.eleveService.createEleve(eleveToCreate).subscribe({
      next: (data: Eleve) => {
        this.ListeEleve.push({ ...data, ideleve: data.ideleve });
        console.log("Élève ajouté !", data);
      },
      error: (err: any) => console.log("Erreur lors de l'ajout de l'élève", err)
    });
  }

  getNoteByEleve(id: number | null) {
    if (id == null) return;

    this.noteserv.getNoteByEleve(id).subscribe({
      next: (data: Note) => {
        this.notee = data;
        console.log("Notes récupérées :", data);
        this.situation = true ;
        this.situationErreur = false ;
      },
      error: (err: any) =>{
        console.log("Erreur lors de la récupération des notes", err);
        this.situationErreur = true ;
        this.situation = false ;

         }

    });
  }
}
