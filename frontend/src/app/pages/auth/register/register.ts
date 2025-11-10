import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, NgxMaskDirective, RouterLink, RouterLinkActive],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  usuario : Usuario ={
    nome: '',
    telefone: '',
    email: '',
    role: null,
    senha: ''
  };

  constructor(private authService : AuthService, private router : Router) {}

  onSubmit(event?: Event) {
    if (event) event.preventDefault();

      // Exibe todos os dados do usuário
  console.log("👤 Dados do usuário a serem enviados:");
  console.log("Nome:", this.usuario.nome);
  console.log("Telefone:", this.usuario.telefone);
  console.log("Email:", this.usuario.email);
  console.log("Tipo de conta (role):", this.usuario.role);
  console.log("Senha:", this.usuario.senha);
  
    console.log("entrou no método");
    this.authService.register(this.usuario).subscribe({
      next: (res) =>{
        console.log("Registro bem-sucedido!", res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log("Erro no registro: ", err);
      }
    });
    
  }
}
