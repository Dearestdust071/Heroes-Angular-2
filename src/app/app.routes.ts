import { mapToCanActivate, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { guardGuard } from './shared/guards/guard.guard';

export const routes: Routes = [
    
    {path:'', redirectTo: "/login", pathMatch:'full'},
    {path:"login", component:LoginComponent},

    {
        path: 'heroes',
        loadComponent: () => import('./heroes/home/home.component').then(c => c.HomeComponent),
        
    },
    {
        path: 'productos',
        loadComponent: () => import('./heroes/productos/productos.component').then(p => p.ProductosComponent),
        canActivate:[guardGuard]
    },
    {
        path: 'crear',
        loadComponent: () => import('./heroes/crear/crear.component').then(c => c.CrearComponent)
    }

];


