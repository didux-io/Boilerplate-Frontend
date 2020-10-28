import { State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/configProvider';
import { Router } from '@angular/router';
import { LogoutAction } from './actions/logout.action';
import { IJWTDecoded } from 'src/app/interfaces/jwtDecoded.interface';
import { SetAccessTokenAction } from './actions/set-access-token.action';
import * as jwt_decode from 'jwt-decode';
import { UpdateUserAction } from './actions/update-account';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';
import { RegistrateUserAction } from './actions/registrate-user';
import { ToastrService } from 'ngx-toastr';
import { UserLoginAction } from './actions/user-login';

export interface IUserState {
    access_token: string;
    refresh_token: string;
    jwtDecoded: IJWTDecoded;
    updateUserError: boolean;
    userLoginError: boolean;
    registratedEmail: string;
    registrationError: boolean;
}

@State<IUserState>({
    name: 'user',
    defaults: {
        access_token: null,
        refresh_token: null,
        jwtDecoded: null,
        registratedEmail: null,
        updateUserError: false,
        userLoginError: false,
        registrationError: false
    }
})
export class UserState {

    @Selector()
    static accessToken(state: IUserState): string {
        return state.access_token;
    }

    @Selector()
    static refreshToken(state: IUserState): string {
        return state.refresh_token;
    }

    @Selector()
    static jwtDecoded(state: IUserState): IJWTDecoded {
        return state.jwtDecoded;
    }

    @Selector()
    static updateUserError(state: IUserState): boolean {
        return state.updateUserError;
    }

    @Selector()
    static userLoginError(state: IUserState): boolean {
        return state.userLoginError;
    }

    @Selector()
    static registratedEmail(state: IUserState): string {
        return state.registratedEmail;
    }

    @Selector()
    static registrationError(state: IUserState): boolean {
        return state.registrationError;
    }

    constructor(private http: HttpClient,
                private toastr: ToastrService,
                private configProvider: ConfigProvider,
                private router: Router) {

    }

    @Action(SetAccessTokenAction)
    setAccessToken(ctx: StateContext<IUserState>, payload: SetAccessTokenAction) {
        const accessToken = payload.accessToken;
        const jwtDecoded: IJWTDecoded = jwt_decode(accessToken);
        return ctx.patchState({
            access_token: accessToken,
            jwtDecoded,
        });
    }

    @Action(LogoutAction)
    logoutAction(ctx: StateContext<IUserState>) {
        return ctx.patchState({
            refresh_token: null,
            access_token: null
        });
    }

    @Action(UserLoginAction)
    userLoginAction(ctx: StateContext<IUserState>, payload: UserLoginAction) {
        ctx.patchState({
            userLoginError: false
        });
        return this.http.post(
            `${this.configProvider.getBackendUrl()}/v1/auth/authemail`,
            {
                email: payload.email,
                password: payload.password
            }
        ).pipe(
            tap((response: any) => {
                console.log('User logged in by email');
                const jwtDecoded: IJWTDecoded = jwt_decode(response.token);
                ctx.patchState({
                    userLoginError: false,
                    access_token: response.token,
                    jwtDecoded
                });
                console.log('patched state');
            }),
            catchError((error) => {
                ctx.patchState({
                    userLoginError: true
                });
                return throwError(error);
            })
        );
    }


    @Action(UpdateUserAction)
    updateUser(ctx: StateContext<IUserState>, payload: UpdateUserAction) {
        const userId = ctx.getState().jwtDecoded.userId;
        ctx.patchState({
            updateUserError: false
        });
        return this.http.patch(
            `${this.configProvider.getBackendUrl()}/v1/user/${userId}`,
            {
                username: payload.username
            }
        ).pipe(
            tap((response: any) => {
                console.log('success update user!');
                const jwtDecoded: IJWTDecoded = jwt_decode(response.token);
                ctx.patchState({
                    updateUserError: false,
                    access_token: response.token,
                    jwtDecoded
                });
            }),
            catchError((error) => {
                ctx.patchState({
                    updateUserError: true
                });
                return throwError(error);
            })
        );
    }

    @Action(RegistrateUserAction)
    registrateUser(ctx: StateContext<IUserState>, payload: RegistrateUserAction) {
        ctx.patchState({
            registrationError: false,
            registratedEmail: null
        });
        return this.http.post(
            `${this.configProvider.getBackendUrl()}/v1/user/registrate`,
            {
                email: payload.email,
                password: payload.password
            }
        ).pipe(
            tap((response: any) => {
                console.log('success update user!');
                this.toastr.success(`Registration success`);
                ctx.patchState({
                    registratedEmail: payload.email
                });
            }),
            catchError((error) => {
                console.log('registrationError FALSE');
                ctx.patchState({
                    registrationError: true
                });
                return throwError(error);
            })
        );
    }
}
