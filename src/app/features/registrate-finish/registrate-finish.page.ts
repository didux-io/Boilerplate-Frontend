import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { skip, takeUntil } from "rxjs/operators";
import { UserStateFacade } from "src/app/state/user/user.facade";
import { BaseComponent } from "../base-component/base-component";

@Component({
    templateUrl: "registrate-finish.page.html",
    styleUrls: ["registrate-finish.page.scss"]
})
export class RegistrateFinishPageComponent extends BaseComponent implements OnInit {
    finishRegistrationForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userStateFacade: UserStateFacade,
        private toastr: ToastrService,
        private ngZone: NgZone,
        private router: Router,
        private translateService: TranslateService
    ) {
        super();

        this.finishRegistrationForm = this.formBuilder.group({
            username: new FormControl("", Validators.required),
            termsAndPrivacyAccepted: new FormControl(false, Validators.requiredTrue),
            newsLetter: new FormControl(false),
        });
    }

    ngOnInit(): void {
        this.userStateFacade.registrationError$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((error) => {
            if (error) {
                this.toastr.error("Registration failure");
            }
        });
        // When the user finished the registration
        this.userStateFacade.accessToken$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((token) => {
            if (token) {
                this.ngZone.run(() => {
                    this.toastr.success("Registration finished");
                });
            }
        });
        // Check whether the user already has a username. Continue if it has
        this.userStateFacade.jwtDecoded$.pipe(takeUntil(this.destroy$)).subscribe((jwtDecoded) => {
            if (jwtDecoded.user_claims.username) {
                this.router.navigate(["home/overview"]);
            }
        });
    }

    registrate(): void {
        const username = this.finishRegistrationForm.get("username").value;
        const termsAndPrivacyAccepted = this.finishRegistrationForm.get("termsAndPrivacyAccepted").value;
        const newsLetter = this.finishRegistrationForm.get("newsLetter").value;
        this.userStateFacade.finishRegistration(username, termsAndPrivacyAccepted, newsLetter, this.translateService.currentLang);
    }

    navigateToTerms(): void {
        this.router.navigate(["terms"]) && window.scrollTo(0, 0);
    }

    navigateToPrivacy(): void {
        this.router.navigate(["privacy"]) && window.scrollTo(0, 0);
    }
}
