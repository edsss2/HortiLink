import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink} from '@angular/router';
import { Navbar } from '../../../components/navbar/navbar.component';
import { Footer } from '../../../components/footer/footer.component';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-painel',
  imports: [RouterOutlet, Navbar, Footer, RouterLinkActive, RouterLink],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css',
})
export class Painel {

  public activeLinkClasses: string = 'border-l-4 border-green-primary bg-green-secundary text-green-primary';
  constructor(private usuarioService : UsuarioService) {}

  get usuarioLogado() {
    return this.usuarioService.getCurrentUser();
  }
}
