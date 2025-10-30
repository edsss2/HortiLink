import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.components';

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  nomeDoUsuario = 'Edson';
}
