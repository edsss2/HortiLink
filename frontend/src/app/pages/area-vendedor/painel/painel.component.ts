import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../components/navbar/navbar.component';
import { Footer } from '../../../components/footer/footer.component';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-painel',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css',
})
export class Painel {

  constructor(private usuarioService : UsuarioService) {}

  get usuarioLogado() {
    return this.usuarioService.getCurrentUser();
  }
}
