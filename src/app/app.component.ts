import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { IBuildNumber } from './interfaces/build-number.interface';
import { ConfigProvider } from "./providers/config/configProvider";
import { AppStateFacade } from "./state/app/app.facade";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor(
        private translateService: TranslateService,
        private http: HttpClient,
        private appStateFacade: AppStateFacade,
        private configProvider: ConfigProvider,
        private titleService: Title
    ) {
        this.translateService.setDefaultLang("en");
        this.translateService.use("en");

        this.setBuildNumber();
    }

    async ngOnInit(): Promise<void> {
        await this.configProvider.getConfig();
        this.titleService.setTitle(this.configProvider.config.appName);
    }

    setBuildNumber(): void {
        this.http.get("assets/buildNumber.json").subscribe((buildNumber: IBuildNumber) => {
            this.appStateFacade.setBuildNumber(buildNumber.buildNumber);
        });
    }
}
