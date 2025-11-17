import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UsuarioService } from "../../services/usuario-service";

export const cadastroCompletoGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const usuario = usuarioService.getCurrentUser();

  // Se for vendedor mas cadastro está incompleto → redireciona
  if (usuario?.role === 'COMERCIO' || usuario?.role === 'PRODUTOR') {
    if (usuario.cadastroIncompleto) {
      router.navigate(['/completar-cadastro']);
      return false;
    }
  }

  return true;
};
