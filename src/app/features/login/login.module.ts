import { NgModule } from "@angular/core";
import { LoginPageComponent } from "./login.page";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsModule } from "src/app/components/components.module";
import { NgxSelectModule } from "ngx-select-ex";
import { LanguageProvider } from "../../providers/language/languageProvider";
import { SafeUrlPipe } from "src/app/pipes/safe-link-pipe";
import { RecoveryModalComponent } from "src/app/modals/recoveryModal.component";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";

const routes: Routes = [
    {
        path: "",
        component: LoginPageComponent
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
        ComponentsModule,
        NgxSelectModule,
        ModalModule.forRoot()
    ],
    declarations: [
        LoginPageComponent,
        SafeUrlPipe,
        RecoveryModalComponent
    ],
    providers: [
        LanguageProvider,
        BsModalService
    ]
})
export class LoginPageModule {

}
