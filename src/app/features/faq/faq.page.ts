import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { LanguageProvider } from "../../providers/language/languageProvider";
import { ConfigProvider } from "src/app/providers/config/configProvider";
import { BaseComponent } from "../base-component/base-component";

@Component({
    templateUrl: "faq.page.html",
    styleUrls: ["faq.page.scss"]
})
export class FaqPageComponent extends BaseComponent implements OnInit {
    languages = [];

    constructor(
        private translateService: TranslateService,
        private router: Router,
        private languageProvider: LanguageProvider,
        private configProvider: ConfigProvider,
    ) {
        super();
    }

    async ngOnInit(): Promise<void> {
        await this.configProvider.getConfig();
        this.languages = this.languageProvider.getLanguages();
    }
}
