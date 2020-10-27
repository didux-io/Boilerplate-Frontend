import { NgModule } from '@angular/core';
import { HomePageComponent } from './home.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { ComponentsModule } from 'src/app/components/components.module';
import { LanguageProvider } from 'src/app/providers/language/languageProvider';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'logout',
                component: LogoutComponent
            },
            {
                path: 'overview',
                loadChildren: '../overview/overview.module#OverviewPageModule'
            },
            {
                path: 'profile',
                loadChildren: '../profile/profile.module#ProfilePageModule'
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FontAwesomeModule,
        ReactiveFormsModule,
        CommonModule,
        ComponentsModule,
        TranslateModule
    ],
    declarations: [
        ...COMPONENTS,
        HomePageComponent
    ]
})
export class HomePageModule {

}
