import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Home } from './pages/home/home';
import { Register } from './pages/auth/register/register';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: 'home', component: Home}
];
