import { Component } from "@angular/core";
import { AppStateFacade } from "src/app/state/app/app.facade";
import { UserStateFacade } from "src/app/state/user/user.facade";

@Component({
    // tslint:disable-next-line: component-selector
    selector: "build-number-text",
    templateUrl: "build-number.component.html",
    styleUrls: ["build-number.component.scss"]
})
export class BuildNumberComponent {
    buildNumber$ = this.appStateFacade.buildNumber$;
    isAdmin$ = this.userStateFacade.isAdmin$;

    constructor(
        private appStateFacade: AppStateFacade,
        private userStateFacade: UserStateFacade
    ) {

    }

}
