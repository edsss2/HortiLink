import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario.model';
import { Footer } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private usuarioService : UsuarioService) {}

  get usuarioLogado() {

    return this.usuarioService.getCurrentUser();
  }
}
