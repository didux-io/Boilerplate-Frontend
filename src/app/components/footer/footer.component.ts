import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AppStateFacade } from "src/app/state/app/app.facade";

@Component({
    selector: "app-footer",
    templateUrl: "footer.component.html",
    styleUrls: ["footer.component.scss"]
})
export class FooterComponent {
    public isMenuCollapsed = true;
    public isAccountCollapsed = true;
    public isLanguageCollapsed = true;

    @Input()
    type: string;

    constructor(
        private router: Router,
        private appStateFacade: AppStateFacade,
        private translateService: TranslateService
    ) {

    }

    navigateToLogin() {
        this.isMenuCollapsed = true;
        this.router.navigate(["login"]);
    }

    navigateToRegistrate() {
        this.router.navigate(["registrate"]);
    }

    navigateToMainPage() {
        this.router.navigate(["main"]) && window.scrollTo(0, 0);
    }
    navigateToTerms() {
        this.router.navigate(["terms"]) && window.scrollTo(0, 0);
    }
    navigateToPrivacy() {
        this.router.navigate(["privacy"]) && window.scrollTo(0, 0);
    }
    navigateToFAQ() {
        this.router.navigate(["faq"]) && window.scrollTo(0, 0);
    }

    selectLanguage(language: string) {
        console.log("language:", language);
        this.appStateFacade.setLanguage(language);
        this.translateService.use(language);
    }
}
