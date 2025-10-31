import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {EleveService} from "../services/eleve.service";
import {Eleve} from "../models/eleve.model";

@Component({
  selector: 'app-maps',
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements AfterViewInit,OnInit {

  eleves : Eleve[] = [] ;
  private map!: L.Map;

  constructor(private eleveSer : EleveService ){}

   ngOnInit(){
    this.eleveSer.getAllEleves().subscribe({
      next : (data : Eleve[]) =>{
        this.eleves = data  ;
        console.log("Tout est bien récupérer");
        if (this.map) {
          this.eleves.forEach(e => this.addMarkerForEleve(e));
        }
        },
      error : ( err : any ) =>{
        console.log("Error est ",err);

        }

      })
    }
  private addMarkerForEleve(e: Eleve): void {
    // Ici on fait un géocodage simple via l’API OpenStreetMap (gratuit)
    const adresse = encodeURIComponent(e.adresse);

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${adresse}`)
      .then(res => res.json())
      .then(locations => {
        if (locations && locations.length > 0) {
          const lat = parseFloat(locations[0].lat);
          const lon = parseFloat(locations[0].lon);

          L.marker([lat, lon])
            .addTo(this.map)
            .bindPopup(`<b>${e.nom} ${e.prenom}</b><br>${e.adresse}`)
            .openPopup();
        }
      })
      .catch(() => console.warn(`Adresse introuvable : ${e.adresse}`));
  }

  ngAfterViewInit(): void {
  // Assigner la carte à la variable de classe
  this.map = L.map('map').setView([45.7640, 4.8357], 13);

  // Couche de base OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(this.map);

  // Marqueur de l'école
  L.marker([45.7640, 4.8357]).addTo(this.map)
    .bindPopup('École ici 🎓')
    .openPopup();

  // Ajouter les marqueurs si les élèves sont déjà chargés
  if (this.map) {
    this.eleves.forEach(e => this.addMarkerForEleve(e));
  }
}

}
