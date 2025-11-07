import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenStorage } from './auth-token-storage';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 👇 TESTE 1: ISSO VAI APARECER NO CONSOLE?
  console.log('Auth Interceptor foi ativado para a rota:', req.url);

  const tokenStorage = inject(AuthTokenStorage);
  const token = tokenStorage.get();

  // 👇 TESTE 2: QUAL O VALOR DO TOKEN?
  console.log('Token encontrado pelo interceptor:', token);

  if (!token) {
    return next(req); 
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedRequest);
};