import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-menu",
    templateUrl: "menu.component.html",
    styleUrls: ["menu.component.scss"],
})
export class MenuComponent implements OnDestroy {

    constructor(private router: Router) {
    }

    ngOnDestroy(): void {
        // do nothing
    }
}
