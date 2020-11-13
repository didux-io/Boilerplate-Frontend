import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { EmailState } from "./email.state";
import { EmailStateFacade } from "./email.facade";

@NgModule({
    imports: [
        NgxsModule.forFeature([EmailState])
    ],
    providers: [
        EmailStateFacade
    ]
})
export class EmailStateModule {

}
