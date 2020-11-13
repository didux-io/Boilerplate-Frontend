import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { ContactFacade } from "./contact.facade";
import { ContactState } from "./contact.state";

@NgModule({
    imports: [
        NgxsModule.forFeature([ContactState])
    ],
    providers: [
        ContactFacade,
    ]
})
export class ContactStateModule {

}
