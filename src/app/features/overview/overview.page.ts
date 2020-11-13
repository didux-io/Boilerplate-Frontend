import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStateFacade } from "src/app/state/app/app.facade";


@Component({
    templateUrl: "overview.page.html",
    styleUrls: ["overview.page.scss"]
})
export class OverviewPageComponent {
    overviewForm: FormGroup;
    constructor(
        private router: Router,
        private appStateFacade: AppStateFacade,
        private test:FormBuilder
    ) {
        this.appStateFacade.setPageTitleLanguageKey("HEADER.OVERVIEW");
        this.overviewForm = this.test.group({
            text: new FormControl("", Validators.required),
            text1: new FormControl("", Validators.required),
            datum1: new FormControl("", Validators.required),
            tijd1: new FormControl("", Validators.required),
            opmerking: new FormControl(""),
        });
    }
}
