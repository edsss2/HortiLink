import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  usuarioLogado: Usuario | null = null;
  @Input() nomeUsuario!: string;
  @Input() emailUsuario!: string;

  constructor(private usuarioService: UsuarioService, private authService : AuthService) {}

  ngOnInit(): void {
    // Se inscreve para receber atualizações do usuário
    this.usuarioService.currentUser$.subscribe(user => {
      this.usuarioLogado = user;
          console.log("👤 Usuárrrriiiiiooooo Loooggadddooo:");
    if (user) {
      console.log("Nome:", user.nome);
      console.log("Telefone:", user.telefone);
      console.log("Email:", user.email);
      console.log("Tipo de conta (role):", user.role);
      console.log("Senha:", user.senha);
    } else {
      console.log("❌ Nenhum usuário logado.");
    }
      console.log("🔄 Navbar atualizado:", user);
    });
  }

  logout() {
    this.authService.logout();
  }
}
