

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;

  try {
    token = localStorage.getItem('token'); // Algunos navegadores bloquean esto
  } catch (error) {
    console.warn('No se pudo acceder a localStorage:', error);
  }

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq);
};

