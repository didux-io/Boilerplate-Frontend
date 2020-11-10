import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateFacade } from 'src/app/state/app/app.facade';

@Component({
    selector: 'app-main-header',
    templateUrl: 'main-header.component.html',
    styleUrls: ['main-header.component.scss']
})
export class MainHeaderComponent {
    public isMenuCollapsed = true;
    public isAccountCollapsed = true;
    public isLanguageCollapsed = true;

    @Input()
    type: string;

    constructor(
        private router: Router
    ) {

    }

    navigateToLogin() {
        this.isMenuCollapsed = true;
        this.router.navigate(['login']);
    }

    navigateToRegistrate() {
        this.router.navigate(['registrate']);
    }

    navigateToMainPage() {
        this.router.navigate(['main']);
    }
}
