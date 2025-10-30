import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request,model';
import { LoginResponse } from '../models/login-response.model';
import { Usuario } from '../models/usuario.model';
import { AuthTokenStorage } from './auth-token-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient, private authTokenStorage : AuthTokenStorage) {}

  private apiUrl = 'http://localhost:8080/auth';

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
