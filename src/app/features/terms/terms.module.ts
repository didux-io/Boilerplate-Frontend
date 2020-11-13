import { NgModule } from "@angular/core";
import { TermsPageComponent } from "./terms.page";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsModule } from "src/app/components/components.module";
import { NgxSelectModule } from "ngx-select-ex";
import { LanguageProvider } from "../../providers/language/languageProvider";

const routes: Routes = [
    {
        path: "",
        component: TermsPageComponent
    }
];

@NgModule({
    imports: [
        TranslateModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        NgbModule,
        ComponentsModule,
        NgxSelectModule
    ],
    declarations: [
        TermsPageComponent
    ],
    providers: [
        LanguageProvider
    ]
})
export class TermsPageModule {

}
