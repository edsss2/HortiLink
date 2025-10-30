import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private currentUser = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUser.asObservable();

  getCurrentUser() : Usuario | null {
    return this.currentUser.value;
  }

  setCurrentUser(usuario: Usuario | null) {
    this.currentUser.next(usuario);
  }
}
