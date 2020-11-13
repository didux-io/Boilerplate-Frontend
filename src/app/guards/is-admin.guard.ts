import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { take } from "rxjs/operators";
import { UserStateFacade } from "../state/user/user.facade";

@Injectable()
export class IsAdminGuard implements CanActivate {
    constructor(
        private userStateFacade: UserStateFacade
    ) {}

    async canActivate(): Promise<boolean> {
        return await this.userStateFacade.isAdmin$.pipe(take(1)).toPromise();
    }
}
