import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first, take } from 'rxjs/operators';
import { AppStateFacade } from 'src/app/state/app/app.facade';

@Component({
    templateUrl: 'overview.page.html',
    styleUrls: ['overview.page.scss']
})
export class OverviewPageComponent implements OnInit {

    constructor(
        private router: Router,
        private appStateFacade: AppStateFacade
    ) {
        this.appStateFacade.setPageTitleLanguageKey('HEADER.OVERVIEW');
    }

    ngOnInit() {

    }
}
