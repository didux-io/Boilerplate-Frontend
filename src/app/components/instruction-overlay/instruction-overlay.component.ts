import { Component } from "@angular/core";
import { UserStateFacade } from "src/app/state/user/user.facade";

@Component({
    // tslint:disable-next-line: component-selector
    selector: "instruction-overlay",
    templateUrl: "instruction-overlay.component.html",
    styleUrls: ["instruction-overlay.component.scss"]
})
export class InstructionOverlayComponent {
    showExternalInstruction$ = this.userStateFacade.showExternalInstruction$;

    constructor(
        private userStateFacade: UserStateFacade
    ) {

    }

}
