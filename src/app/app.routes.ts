import { Routes } from '@angular/router';

import {ConnexionComponent} from './components/connexion/connexion.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FirstPageComponent} from './components/FirstPage/FirstPage.component';
import { GestionEleveComponent } from './components/gestion-eleve/gestion-eleve.component';

import { TableauComponent } from './components/tableau/tableau.component';
import { MapsComponent } from './components/maps/maps.component';
import { NotesComponent } from './components/notes/notes.component';
import { AuthGuard } from './components/services/auth.guard';

export const routes: Routes = [

  { path: 'Connexion' , component: ConnexionComponent},
  {path: 'navigation' , component: NavigationComponent },
  {path: 'FirstPage' , component: FirstPageComponent },
  {path: 'Notes' , component: NotesComponent },
  { path: '', redirectTo: '/Connexion', pathMatch: 'full' } ,

  {path: 'tableau' , component:TableauComponent  },
  {path: 'ListeEleve' , component:GestionEleveComponent,canActivate: [AuthGuard] },
  {path: 'maps' , component:MapsComponent,canActivate: [AuthGuard] },
];
