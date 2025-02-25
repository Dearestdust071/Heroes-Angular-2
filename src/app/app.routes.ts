import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    
    {path:'', redirectTo: "/login", pathMatch:'full'},
    {path:"login", component:LoginComponent},

    {
        path: 'heroes',
        loadComponent: () => import('./heroes/home/home.component').then(c => c.HomeComponent)
    }

];
