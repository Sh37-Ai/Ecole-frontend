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
import { Router } from '@angular/router';
import {salle} from '../models/salle.model';


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
  sall : salle | undefined;

  displayedColumns: string[] = ['id_eleve', 'nom', 'prenom', 'telephone', 'adresse', 'classe_id','action'];

  constructor(private eleveService: EleveService , private route : Router , private salleServicee: salleService ) {}

  ngOnInit(){
    this.eleveService.getAllEleves().subscribe((data: Eleve[]) => {
      this.ListeEleve = data;
      console.log("Liste des élèves : ", this.ListeEleve);
    });
  }



  Suppression(id: number | undefined) {
  if (id != null) {
    this.eleveService.deleteEleve(id).subscribe({
      next: () => {
        console.log("Élève supprimé");
      },
      error: (err) => {
        console.log("Élève non supprimé", err);
      }
    });
  } else {
    console.log("Élève non supprimé : ID manquant");
  }
  }

  update(IDInput: HTMLInputElement,nom: string | undefined , prenom: string | undefined , telephone: string | undefined , adresse: string | undefined , classe_id: string | undefined ){
    if (  !nom || !prenom || !telephone || !adresse || !classe_id) {
      console.log("Tous les champs sont requis !");
      return;
    }
    let id = Number(IDInput.value?.toString().trim());

    const newEleve  = {
      id_eleve:id ,
      nom,
      prenom,
      telephone,
      adresse,
      classe: { id_classe: classe_id }
    };

    this.eleveService.updateEleve(id,newEleve).subscribe({
      next : (data) => {
        console.log("Modification fait !");
        },
      error : (err) =>{
        console.log("erreur lors de modification");
        }
      });

  }
  Navigation(id : number | null){
    this.route.navigate(['/maps']);
    this.salleServicee.getSalleById(id).subscribe({
      next : (data: salle) =>{
        this.sall = data;
        console.log("Bien vue",data);
        },
      error : (err : any) => {
        console.log("Problème");
        }

      });


    }


  ajouter( nom: string | undefined , prenom: string | undefined , telephone: string | undefined , adresse: string | undefined , classe_id: string | undefined ){
    if ( !nom || !prenom || !telephone || !adresse || !classe_id) {
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
        this.ListeEleve.push(data);
        console.log("Élève ajouté !", data);
      },
      error: (err: any) => {
        console.log("Erreur lors de l'ajout de l'élève", err);
      }
    });
  }

}

