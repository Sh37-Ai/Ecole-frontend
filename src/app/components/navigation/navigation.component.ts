import { Component } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(private router: Router,) {
  }

  firstPage(){
    this.router.navigate(['/ListeEleve'])
  }

}
