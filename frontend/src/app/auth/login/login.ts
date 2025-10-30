import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginRequest } from '../../models/login-request,model';
import { LoginResponse } from '../../models/login-response.model';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { AuthTokenStorage } from '../../services/auth-token-storage';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginRequest: LoginRequest = {
    email: '',
    senha: ''
  };

  loginResponse : LoginResponse = {
    token: '',
    usuario: null
  };

  constructor(private authService : AuthService, private router: Router, private authTokenStorage : AuthTokenStorage, private usuarioService : UsuarioService) {}

  onSubmit(event?: Event) {
    if (event) event.preventDefault();

    this.authService.login(this.loginRequest).subscribe({
      next: (res) => {
        console.log("Login bem-sucedido!", res);

        this.authTokenStorage.set(res.token);
        this.usuarioService.setCurrentUser(res.usuario)

        this.loginResponse = res;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Erro no login: ", err);
        alert(err);
      }
    });
  }
}
