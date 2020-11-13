import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { contactAction } from "./actions/contact";


@Injectable({
    providedIn: "root"
})
export class ContactFacade {

    constructor(private store: Store) {}

    contact(name: string, email: string, message: string): Observable<any> {
        console.log("frikandel2");
        return this.store.dispatch(new contactAction(name, email, message));
    }
}
