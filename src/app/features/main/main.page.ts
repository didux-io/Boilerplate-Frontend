import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { LanguageProvider } from "../../providers/language/languageProvider";
import { ConfigProvider } from "src/app/providers/config/configProvider";
import { BaseComponent } from "../base-component/base-component";
import { ContactFacade } from "src/app/state/contact/contact.facade";


@Component({
    templateUrl: "main.page.html",
    styleUrls: ["main.page.scss"]
})
export class MainPageComponent extends BaseComponent implements OnInit {
    contactForm: FormGroup;
    languages = [];

    constructor(
        private formBuilder: FormBuilder,
        private translateService: TranslateService,
        private router: Router,
        private languageProvider: LanguageProvider,
        private configProvider: ConfigProvider,
        private ContactFacade: ContactFacade
    ) {
        super();

        this.contactForm = this.formBuilder.group({
            name: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            message: new FormControl("", Validators.required)
        });
    }

    async ngOnInit() {
        await this.configProvider.getConfig();
        this.languages = this.languageProvider.getLanguages();
    }
    navigateToTerms() {
        this.router.navigate(["terms"]);
    }
    navigateToPrivacy() {
        this.router.navigate(["privacy"]);
    }
    navigateToFAQ() {
        this.router.navigate(["faq"]);
    }
    sendEmail() {
        const name = this.contactForm.get("name").value;
        const email = this.contactForm.get("email").value;
        const message = this.contactForm.get("message").value;
        this.ContactFacade.contact(name, email, message);
        console.log("frikandel");
    }
}
