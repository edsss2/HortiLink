import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Navbar } from '../../components/navbar/navbar.component';
import { Footer } from "../../components/footer/footer.component";

@Component({
  selector: 'app-carrinho',
  imports: [Footer, Navbar],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {

  carrinho: number[] = [];
  carrinhoCount: number = 0;

  constructor(private usuarioService : UsuarioService){}

  get usuarioLogado() {
    return this.usuarioService.getCurrentUser();
  }

}
