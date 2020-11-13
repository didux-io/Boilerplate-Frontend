import {Component, NgModule, OnDestroy} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-menu",
    templateUrl: "menu.component.html",
    styleUrls: ["menu.component.scss"],
})
@NgModule()
export class MenuComponent implements OnDestroy {

    constructor(private router: Router) {
    }

    ngOnDestroy(): void {

    }
}
