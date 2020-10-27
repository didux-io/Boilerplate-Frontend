import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasJwtTokenDefinedGuard } from './guards/has-jwt-token-defined.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full',
    },
    {
        path: 'main',
        loadChildren: './features/main/main.module#MainPageModule'
    },
    {
        path: 'login',
        loadChildren: './features/login/login.module#LoginPageModule'
    },
    {
        path: 'registrate',
        loadChildren: './features/registrate/registrate.module#RegistratePageModule'
    },
    {
        path: 'home',
        loadChildren: './features/home/home.module#HomePageModule',
        canActivate: [HasJwtTokenDefinedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
