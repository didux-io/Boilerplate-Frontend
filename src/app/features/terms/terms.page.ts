import { Component, OnInit} from "@angular/core";
import { LanguageProvider } from "../../providers/language/languageProvider";
import { ConfigProvider } from "src/app/providers/config/configProvider";
import { BaseComponent } from "../base-component/base-component";


@Component({
    templateUrl: "terms.page.html",
    styleUrls: ["terms.page.scss"]
})
export class TermsPageComponent extends BaseComponent implements OnInit {
    languages = [];

    constructor(
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
