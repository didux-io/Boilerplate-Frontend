import { Component } from "@angular/core";
import {ConfigProvider} from "../../providers/config/configProvider";

@Component({
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"]
})
export class HomePageComponent {
<<<<<<< HEAD
=======
    showExternalInstruction$: any;
    loginType$: any;
    appName: string;
    appDesc: string;

    constructor(
        private configProvider: ConfigProvider
    ) {
        this.configProvider.getConfig();
    }

    ngOnInit() {
        this.appName = this.configProvider.appName;
        this.appDesc = this.configProvider.appDescription;
    }
>>>>>>> 96b785443ec48c3b90fcebbbb7ecb9ab19068f18

}
