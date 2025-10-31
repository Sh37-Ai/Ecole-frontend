import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecuriteService } from './securite.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private securiteService: SecuriteService, private router: Router) {}

  canActivate(): boolean {
    if (this.securiteService.getToken()) {
      console.log('Token présent : accès autorisé');
      return true;
    } else {
      console.log('Pas de token : redirection vers login');
      this.router.navigate(['/Connexion']);
      return false;
    }
  }
}
