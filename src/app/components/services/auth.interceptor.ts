import { inject } from '@angular/core';
import { HttpInterceptorFn,HttpErrorResponse } from '@angular/common/http';
import { SecuriteService } from './securite.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const securiteService = inject(SecuriteService);
  const router = inject(Router);
  const token = securiteService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned).pipe(catchError((err : HttpErrorResponse) =>{
      if(err.status == 401){
         securiteService.clearToken();
        alert('Votre session a expiré. Veuillez vous reconnecter.');
        router.navigate(['/Connexion']);

        }
      return throwError(() => err);

      }
    ))
  }

  return next(req);
};
