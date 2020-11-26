import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { skip, takeUntil } from "rxjs/operators";
import { UserStateFacade } from "src/app/state/user/user.facade";
import { BaseComponent } from "../base-component/base-component";

@Component({
    templateUrl: "registrate.page.html",
    styleUrls: ["registrate.page.scss"]
})
export class RegistratePageComponent extends BaseComponent implements OnInit {
    registrateForm: FormGroup;

    websocketDisconnected = false;
    registratedEmail: string;

    constructor(
        private formBuilder: FormBuilder,
        private userStateFacade: UserStateFacade,
        private toastr: ToastrService,
        private translateService: TranslateService
    ) {
        super();

        this.registrateForm = this.formBuilder.group({
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required)
        });
    }

    ngOnInit(): void {
        this.userStateFacade.registrationError$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((error) => {
            if (error) {
                this.toastr.error("Registration failure");
            }
        });
        this.userStateFacade.registratedEmail$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((email) => {
            if (email) {
                this.registratedEmail = email;
                this.toastr.success("Registration success");
            }
        });
    }

    registrate(): void {
        const email = this.registrateForm.get("email").value;
        const password = this.registrateForm.get("password").value;
        const language = this.translateService.currentLang;
        this.userStateFacade.registrate(email, password, language);
    }
}
