import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },

  {
    path: 'heroes',
    loadComponent: () => import('./heroes/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'crear',
    loadComponent: () => import('./heroes/crear/crear.component').then(c => c.CrearComponent)
  },
  {
    path: 'productos',
    loadComponent: () => import('./heroes/productos/productos.component').then((p => p.ProductosComponent))
  }

  // hacer tablas para que regrese algo con todo alv

];
