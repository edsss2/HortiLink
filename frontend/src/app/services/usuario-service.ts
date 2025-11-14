import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private currentUser = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUser.asObservable();

  public isVendedor(): boolean {
    const usuario = this.getCurrentUser();
    if (!usuario) {
      return false;
    }
    return usuario.role === Role.PRODUTOR || usuario.role == Role.COMERCIO;
  }

  getCurrentUser() : Usuario | null {
    const user = this.currentUser.value;
    return user;
  }

  setCurrentUser(usuario: Usuario | null) {
    this.currentUser.next(usuario);
  }
}
