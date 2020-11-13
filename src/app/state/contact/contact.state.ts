import { State, Selector, StateContext, Action } from "@ngxs/store";
import { HttpClient } from "@angular/common/http";
import { ConfigProvider } from "src/app/providers/config/configProvider";
import { tap } from "rxjs/operators";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { contactAction } from "./actions/contact";

export interface IContactState {
    contactError: boolean;
}

@State<IContactState>({
    name: "contact",
    defaults: {
        contactError: false
    }
})
@Injectable()
export class ContactState {

    @Selector()
    static contactError(state: IContactState): boolean {
        return state.contactError;
    }

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private configProvider: ConfigProvider
    ) {

    }
    @Action(contactAction)
    contact(ctx: StateContext<IContactState>, payload: contactAction) {
        console.log("payload:", payload);
        return this.http.post(
            `${this.configProvider.getBackendUrl()}/v1/user/contact`,
            {
                name: payload.name,
                email: payload.email,
                message: payload.message
            })
            .pipe(
                tap((response: any) => {
                    console.log(response);
                }),
                catchError((error) => {
                    return throwError(error);
                })
            ); 
        }
     }
