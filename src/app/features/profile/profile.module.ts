import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile.page";
import { Routes, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSelectModule } from "ngx-select-ex";
import { LanguageProvider } from "../../providers/language/languageProvider";

const routes: Routes = [
    {
        path: "",
        component: ProfilePageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        NgbModule,
        NgxSelectModule,
    ],
    declarations: [
        ProfilePageComponent,
    ],
    providers: [
        LanguageProvider
    ]
})
export class ProfilePageModule {

}
