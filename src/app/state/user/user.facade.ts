import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IJWTDecoded } from 'src/app/interfaces/jwtDecoded.interface';
import { FinishRegistrationAction } from './actions/finish-registration';
import { LogoutAction } from './actions/logout.action';
import { RefreshAction } from './actions/refresh.action';
import { RegistrateUserAction } from './actions/registrate-user';
import { SetAccessTokenAction } from './actions/set-access-token.action';
import { UpdateUserAction } from './actions/update-account';
import { UserLoginAction } from './actions/user-login';
import { UserState } from './user.state';

@Injectable({
    providedIn: 'root'
})
export class UserStateFacade {
    @Select(UserState.isAdmin)
    isAdmin$: Observable<boolean>;

    @Select(UserState.accessToken)
    accessToken$: Observable<string>;

    @Select(UserState.jwtDecoded)
    jwtDecoded$: Observable<IJWTDecoded>;

    @Select(UserState.updateUserError)
    updateUserError$: Observable<boolean>;

    @Select(UserState.userLoginError)
    userLoginError$: Observable<boolean>;

    @Select(UserState.registrationError)
    registrationError$: Observable<boolean>;

    @Select(UserState.registratedEmail)
    registratedEmail$: Observable<string>;

    constructor(private store: Store) {}

    logout(): Observable<any> {
        return this.store.dispatch(new LogoutAction());
    }

    refresh(): Observable<any> {
        return this.store.dispatch(new RefreshAction());
    }

    setAccessToken(token: string): Observable<any> {
        return this.store.dispatch(new SetAccessTokenAction(token));
    }

    updateAccount(username: string): Observable<any> {
        return this.store.dispatch(new UpdateUserAction(username));
    }

    registrate(email: string, password: string): Observable<any> {
        return this.store.dispatch(new RegistrateUserAction(email, password));
    }

    userLogin(email: string, password: string): Observable<any> {
        return this.store.dispatch(new UserLoginAction(email, password));
    }

    finishRegistration(username: string, termsAndPrivacyAccepted: string, newsLetter: string): Observable<any> {
        return this.store.dispatch(new FinishRegistrationAction(username, termsAndPrivacyAccepted, newsLetter));
    }
}
