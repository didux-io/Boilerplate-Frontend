import { BuildNumberComponent } from './build-number/build-number.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FontAwesomeModule
=======
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderComponent } from './main-header/main-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageProvider } from '../providers/language/languageProvider';


@NgModule({
    imports: [
        TranslateModule,
        RouterModule,
        CommonModule,
        FontAwesomeModule,
        NgbModule
>>>>>>> 8688c8e... main,terms,privacy
    ],
    declarations: [
        BuildNumberComponent,
        MainHeaderComponent
    ],
    exports: [
        BuildNumberComponent,
<<<<<<< HEAD
        MainHeaderComponent
=======
        MainHeaderComponent,
    ],
    providers: [
        LanguageProvider
>>>>>>> 8688c8e... main,terms,privacy
    ]
})
export class ComponentsModule {}
