import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario-service';
import { AuthService } from '../../services/auth-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  usuarioLogado: Usuario | null = null;
  @Input() nomeUsuario!: string;
  @Input() emailUsuario!: string;

  quantidadeCarrinho = 0;
  isVendedor: boolean = false;

  constructor(private usuarioService: UsuarioService, private authService : AuthService, private carrinhoService : CarrinhoService) {
    this.isVendedor = usuarioService.isVendedor();
  }

  ngOnInit(): void {
    this.usuarioService.currentUser$.subscribe(user => {
      this.usuarioLogado = user;
        
    if (user) {
      console.log("Nome:", user.nome);
    } else {
      console.log("❌ Nenhum usuário logado.");
    }
      console.log("🔄 Navbar atualizado:", user);
    });

    this.carrinhoService.carrinho$.subscribe(itens => {
      this.quantidadeCarrinho = itens.length;
    });
  }

  logout() {
    this.authService.logout();
  }
}
