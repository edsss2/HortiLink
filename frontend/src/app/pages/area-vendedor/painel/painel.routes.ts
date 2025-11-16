import { Routes } from "@angular/router";
import { Painel } from "./painel.component";
import { Dashboard } from "./dashboard/dashboard";
import { Pedidos } from "./pedidos/pedidos";
import { Vitrine } from "./vitrine/vitrine";
import { CadastrarProduto } from "./cadastrar-produto/cadastrar-produto";


export const PAINEL_ROUTES: Routes = [
  {
    path: '',
    component: Painel,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard},
      { path: 'pedidos', component: Pedidos},
      { path: 'vitrine', component: Vitrine},
      { path: 'cadastrar', component: CadastrarProduto}
    ]
  }
];