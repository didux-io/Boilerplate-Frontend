import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppStateFacade } from 'src/app/state/app/app.facade';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {

    pageTitleLanguageKey$ = this.appStateFacade.pageTitleLanguageKey$;

    constructor(
        private router: Router,
        private appStateFacade: AppStateFacade
    ) {

    }
}
