import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: '', component: Home}
];
