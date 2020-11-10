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
<<<<<<< HEAD
=======
        path: 'terms',
        loadChildren: './features/terms/terms.module#TermsPageModule'
    },
    {
        path: 'privacy',
        loadChildren: './features/privacy/privacy.module#PrivacyPageModule'
    },
    {
>>>>>>> 8688c8e... main,terms,privacy
        path: 'registrate-finish',
        loadChildren: './features/registrate-finish/registrate-finish.module#RegistrateFinishPageModule'
    },
    {
        path: 'home',
        loadChildren: './features/home/home.module#HomePageModule',
        canActivate: [HasJwtTokenDefinedGuard]
    }
<<<<<<< HEAD
=======

>>>>>>> 8688c8e... main,terms,privacy
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
