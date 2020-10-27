import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateFacade } from 'src/app/state/app/app.facade';

@Component({
    selector: 'app-main-header',
    templateUrl: 'main-header.component.html',
    styleUrls: ['main-header.component.scss']
})
export class MainHeaderComponent {

    @Input()
    type: string;

    constructor(
        private router: Router
    ) {

    }

    navigateToLogin() {
        this.router.navigate(['login']);
    }

    navigateToRegistrate() {
        this.router.navigate(['registrate']);
    }

    toMainPage() {
        this.router.navigate(['main']);
    }
}
