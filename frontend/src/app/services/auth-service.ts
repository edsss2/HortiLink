import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request,model';
import { LoginResponse } from '../models/login-response.model';
import { Usuario } from '../models/usuario.model';
import { AuthTokenStorage } from './auth-token-storage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient, private authTokenStorage : AuthTokenStorage) {}

  private apiUrl = `${environment.apiUrl}/auth`

  login(credentials : LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(usuario : Usuario) {
    return this.http.post(`${this.apiUrl}/register`, usuario, { responseType: 'text' });
  }

  logout() {
    this.authTokenStorage.clear();
  }
}
