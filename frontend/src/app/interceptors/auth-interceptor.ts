import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthTokenStorage } from "../services/auth-token-storage";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    private localStorageToken = inject(AuthTokenStorage);
    private router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // ----------- 1) ROTAS QUE NÃO RECEBEM TOKEN -----------
        const skipAuth =
            req.url.includes('/auth/login') ||
            req.url.includes('/auth/register') ||
            req.url.includes('/auth/verify');

        if (skipAuth) {
            return next.handle(req); // → NÃO ADICIONA TOKEN
        }

        // ----------- 2) ROTAS COM TOKEN NORMALMENTE -----------
        const token = this.localStorageToken.get();
        let authReq = req;

        if (token) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(authReq);
    }
}
