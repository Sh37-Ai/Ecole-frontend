import { Routes } from '@angular/router';
import { ElevesListComponent } from './components/eleves/eleves-list/eleves-list.component';
import {EleveDetailsComponent} from './components/eleves/eleve-details/eleve-details.component';
import {ConnexionComponent} from './components/connexion/connexion.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FirstPageComponent} from './components/FirstPage/FirstPage.component';

export const routes: Routes = [
  { path: 'eleves', component: ElevesListComponent },
  { path: 'Connexion' , component: ConnexionComponent},
  {path: 'navigation' , component: NavigationComponent },
  {path: 'FirstPage' , component: FirstPageComponent },
  { path: '', redirectTo: '/FirstPage', pathMatch: 'full' } ,
  {path: 'Détails/:id' , component:EleveDetailsComponent }
];
