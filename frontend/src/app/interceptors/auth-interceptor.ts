import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthTokenStorage } from "../services/auth-token-storage";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    private localStorageToken: AuthTokenStorage;

    constructor() {
        this.localStorageToken = inject(AuthTokenStorage); 
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.localStorageToken.get();

        if (!token) {
            return next.handle(req);
        }
        
        const authToken = `Bearer ${token}`;

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        return next.handle(authReq);
    }

}