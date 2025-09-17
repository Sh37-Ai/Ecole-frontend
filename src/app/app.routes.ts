import { Routes } from '@angular/router';

import {ConnexionComponent} from './components/connexion/connexion.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FirstPageComponent} from './components/FirstPage/FirstPage.component';
import { GestionEleveComponent } from './components/gestion-eleve/gestion-eleve.component';
import { ReservationComponent } from './components/reservation/reservation.component';


export const routes: Routes = [

  { path: 'Connexion' , component: ConnexionComponent},
  {path: 'navigation' , component: NavigationComponent },
  {path: 'FirstPage' , component: FirstPageComponent },
  { path: '', redirectTo: '/résérvation', pathMatch: 'full' } ,
  {path: 'résérvation' , component:ReservationComponent },
  {path: 'ListeEleve' , component:GestionEleveComponent }
];
