import { State, Selector, StateContext, Action } from "@ngxs/store";
import { SetPageTitleLanguageKeyAction } from "./actions/set-page-title-language-key.action";
import { SetBuildNumber } from "./actions/set-build-number.action";
import { SetLanguage } from "./actions/set-language.action";
import { SetAuthWsUrlAction } from "./actions/set-auth-ws-url";
import { HttpClient } from "@angular/common/http";
import { ConfigProvider } from "src/app/providers/config/configProvider";
import { Injectable } from "@angular/core";

export interface IAppState {
    pageTitleLanguageKey: string;
    buildNumber: number;
    language: string;
    authWsUrl: string;
    emailEnabled: boolean;
    webRtcEnabled: boolean;
    backendUrlDown: boolean;
}

@State<IAppState>({
    name: "app",
    defaults: {
        pageTitleLanguageKey: "",
        buildNumber: 0,
        language: "en",
        authWsUrl: null,
        webRtcEnabled: false,
        emailEnabled: false,
        backendUrlDown: false
    }
})
@Injectable()
export class AppState {
    @Selector()
    static backendUrlDown(state: IAppState): boolean {
        return state.backendUrlDown;
    }

    @Selector()
    static pageTitleLanguageKey(state: IAppState): string {
        return state.pageTitleLanguageKey;
    }

    @Selector()
    static buildNumber(state: IAppState): number {
        return state.buildNumber;
    }

    @Selector()
    static language(state: IAppState): string {
        return state.language;
    }

    @Selector()
    static authWsUrl(state: IAppState): string {
        return state.authWsUrl;
    }

    @Selector()
    static emailEnabled(state: IAppState): boolean {
        return state.emailEnabled;
    }

    @Selector()
    static webRtcEnabled(state: IAppState): boolean {
        return state.webRtcEnabled;
    }

    constructor(
        private http: HttpClient,
        private configProvider: ConfigProvider
    ) {}

    @Action(SetPageTitleLanguageKeyAction)
    setPageTitleLanugeKey(ctx: StateContext<IAppState>, payload: SetPageTitleLanguageKeyAction): void {
        ctx.patchState({
            pageTitleLanguageKey: payload.pageTitleLanguageKey
        });
    }

    @Action(SetBuildNumber)
    setBuildNumber(ctx: StateContext<IAppState>, payload: SetBuildNumber): void {
        ctx.patchState({
            buildNumber: payload.buildNumber
        });
    }

    @Action(SetLanguage)
    setLanguage(ctx: StateContext<IAppState>, payload: SetLanguage): void {
        ctx.patchState({
            language: payload.language
        });
    }

    @Action(SetAuthWsUrlAction)
    setAuthWsUrl(ctx: StateContext<IAppState>, payload: SetAuthWsUrlAction): void {
        console.log('setAuthWsUrl');
        this.http.get<any>(`${this.configProvider.config.backendUrl}/v1/config`).subscribe((config) => {
            ctx.patchState({
                backendUrlDown: false,
                authWsUrl: config.authWsUrl,
                emailEnabled: config.emailEnabled,
                webRtcEnabled: config.webRtcEnabled
            });
        }, (err) => {
            ctx.patchState({
                backendUrlDown: true
            })
            console.error(err);
        });
    }
}
