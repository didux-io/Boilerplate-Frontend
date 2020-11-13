<<<<<<< HEAD
import { Component } from "@angular/core";
import { UserStateFacade } from "src/app/state/user/user.facade";
=======
import {Component, NgModule, OnDestroy} from "@angular/core";
import { Router } from "@angular/router";
>>>>>>> 96b785443ec48c3b90fcebbbb7ecb9ab19068f18

@Component({
    selector: "app-menu",
    templateUrl: "menu.component.html",
    styleUrls: ["menu.component.scss"],
})
<<<<<<< HEAD
export class MenuComponent {
=======
@NgModule()
export class MenuComponent implements OnDestroy {
>>>>>>> 96b785443ec48c3b90fcebbbb7ecb9ab19068f18

    isAdmin$ = this.userStateFacade.isAdmin$;

    constructor(
        private userStateFacade: UserStateFacade
    ) {

    }
}
