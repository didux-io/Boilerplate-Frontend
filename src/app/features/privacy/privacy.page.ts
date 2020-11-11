import { Component, OnInit} from "@angular/core";
import { LanguageProvider } from "../../providers/language/languageProvider";
import { ConfigProvider } from "src/app/providers/config/configProvider";
import { BaseComponent } from "../base-component/base-component";


@Component({
    templateUrl: "privacy.page.html",
    styleUrls: ["privacy.page.scss"]
})
export class PrivacyPageComponent extends BaseComponent implements OnInit {
    languages = [];

    constructor(
        private languageProvider: LanguageProvider,
        private configProvider: ConfigProvider,
    ) {
        super();
    }

    async ngOnInit() {
        await this.configProvider.getConfig();
        this.languages = this.languageProvider.getLanguages();
    }
}
