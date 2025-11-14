import { Routes } from "@angular/router";
import { Painel } from "./painel.component";


export const PAINEL_ROUTES: Routes = [
  {
    path: '/area-vendedor',
    component: Painel,
    children: [
      // 2. Rotas "filhas" que aparecem DENTRO do <router-outlet> do PainelComponent
      { path: 'produtos', component: MeusProdutosComponent },
      { path: 'pedidos', component: PedidosRecebidosComponent },
      { path: '', redirectTo: 'produtos', pathMatch: 'full' }
    ]
  }
];