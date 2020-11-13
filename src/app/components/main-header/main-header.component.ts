import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AppStateFacade } from "src/app/state/app/app.facade";

@Component({
    selector: "app-main-header",
    templateUrl: "main-header.component.html",
    styleUrls: ["main-header.component.scss"]
})
export class MainHeaderComponent {
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

    navigateToLogin(): void {
        this.isMenuCollapsed = true;
        this.router.navigate(["login"]);
    }

    navigateToRegistrate(): void {
        this.router.navigate(["registrate"]);
    }

    navigateToMainPage(): void {
        this.router.navigate(["main"]);
    }

    selectLanguage(language: string): void {
        this.appStateFacade.setLanguage(language);
        this.translateService.use(language);
    }

    toggleMobileHamburger(): void {
        this.isMenuCollapsed = !this.isMenuCollapsed;
    }

    toggleAccountDropdown(): void {
        this.isAccountCollapsed = !this.isAccountCollapsed
    }

    toggleLanguageDropdown(): void {
        this.isLanguageCollapsed = !this.isLanguageCollapsed
    }
}
