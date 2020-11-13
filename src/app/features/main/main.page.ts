import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LanguageProvider } from "../../providers/language/languageProvider";
import { ConfigProvider } from "src/app/providers/config/configProvider";
import { BaseComponent } from "../base-component/base-component";
import { load, ReCaptchaInstance } from "recaptcha-v3";
import { EmailStateFacade } from "src/app/state/email/email.facade";
import { filter, takeUntil } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Component({
    templateUrl: "main.page.html",
    styleUrls: ["main.page.scss"]
})
export class MainPageComponent extends BaseComponent implements OnInit {
    languages = [];
    recaptcha: ReCaptchaInstance


    constructor(
        private router: Router,
        private languageProvider: LanguageProvider,
        private configProvider: ConfigProvider,
        private emailStateFacade: EmailStateFacade,
        private toastrService: ToastrService
    ) {
        super();
    }

    async ngOnInit(): Promise<void> {
        const config = await this.configProvider.getConfig();
        this.languages = this.languageProvider.getLanguages();

        // Captcha
        this.recaptcha = await load(config.captchaSiteKey);

        this.emailStateFacade.emailSendSuccess$.pipe(takeUntil(this.destroy$), filter(x => !!x)).subscribe(() => {
            this.toastrService.success("Email send!");
        });

        this.emailStateFacade.emailSendFailure$.pipe(takeUntil(this.destroy$), filter(x => !!x)).subscribe(() => {
            this.toastrService.error("Email not send!");
        });
    }

    navigateToTerms(): void {
        this.router.navigate(["terms"]);
    }

    navigateToPrivacy(): void {
        this.router.navigate(["privacy"]);
    }

    navigateToFAQ(): void {
        this.router.navigate(["faq"]);
    }

    async sendEmail(): Promise<void> {
        const token = await this.recaptcha.execute("submit");

        console.log(token);

        const email = "ww";
        const name = "ww";
        const message = "ww";

        this.emailStateFacade.sendEmail(email, name, message, token);

    }
}
