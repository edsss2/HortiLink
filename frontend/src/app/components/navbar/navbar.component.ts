import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
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

  quantidadeCarrinho = 0;
  isVendedor: boolean = false;

  constructor(private usuarioService: UsuarioService, private authService : AuthService, private carrinhoService : CarrinhoService, private elementRef: ElementRef) {
    this.isVendedor = usuarioService.isVendedor();
  }

  public isDropdownOpen = false;

ngOnInit(): void {
  this.usuarioService.currentUser$.subscribe(user => {
    this.usuarioLogado = user;
  });

  this.carrinhoService.carrinho$.subscribe(itens => {
    this.quantidadeCarrinho = itens.length;
  });
}


  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation(); // A parte mais importante!
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    
    if (!clickedInside && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  logout() {
    this.isDropdownOpen = false; 
    this.usuarioService.setCurrentUser(null);
  }
}
