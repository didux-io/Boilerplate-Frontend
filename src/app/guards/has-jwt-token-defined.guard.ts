import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { UserStateFacade } from '../state/user/user.facade';

@Injectable()
export class HasJwtTokenDefinedGuard implements CanActivate {
    constructor(
        private store: Store,
        private router: Router,
        private userStateFacade: UserStateFacade
    ) {}

    async canActivate() {
        const token = await this.userStateFacade.accessToken$.pipe(take(1)).toPromise();
        console.log('HasJwtTokenDefinedGuard token', token);
        if (!token) {
            console.log('No token defined! Back to login');
            this.router.navigate(['login']);
        }
        return !!token;
    }
}
