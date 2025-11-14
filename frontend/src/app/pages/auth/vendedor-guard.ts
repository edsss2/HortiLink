import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';

export const vendedorGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const isVendedor = usuarioService.isVendedor();

  if(isVendedor) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
