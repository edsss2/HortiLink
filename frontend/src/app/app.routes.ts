import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Home } from './pages/home/home';
import { Register } from './pages/auth/register/register';
import { Carrinho } from './pages/carrinho/carrinho';
import { vendedorGuard } from './pages/auth/vendedor-guard';
import { cadastroCompletoGuard } from './pages/auth/cadastroCompletoGuard';
import { CompletarCadastro } from './pages/completar-cadastro/completar-cadastro';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'home', component: Home},
    {path: 'carrinho', component: Carrinho},
    {path: 'completar-cadastro', component: CompletarCadastro},
    {
        path: 'painel',
        canActivate: [ vendedorGuard, cadastroCompletoGuard ],
        loadChildren: () => import('./pages/area-vendedor/painel/painel.routes').then(m => m.PAINEL_ROUTES)
    }
];
