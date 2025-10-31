import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { SecuriteService } from './securite.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const securiteService = inject(SecuriteService);
  const token = securiteService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
