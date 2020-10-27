import { BuildNumberComponent } from './build-number/build-number.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        BuildNumberComponent,
        MainHeaderComponent
    ],
    exports: [
        BuildNumberComponent,
        MainHeaderComponent
    ]
})
export class ComponentsModule {}
