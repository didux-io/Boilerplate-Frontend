import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup } from '@angular/forms';
=======
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
>>>>>>> 8688c8e... main,terms,privacy
import { Router } from '@angular/router';
import { first, take } from 'rxjs/operators';
import { AppStateFacade } from 'src/app/state/app/app.facade';

<<<<<<< HEAD
=======

>>>>>>> 8688c8e... main,terms,privacy
@Component({
    templateUrl: 'overview.page.html',
    styleUrls: ['overview.page.scss']
})
export class OverviewPageComponent implements OnInit {
<<<<<<< HEAD

    constructor(
        private router: Router,
        private appStateFacade: AppStateFacade
    ) {
        this.appStateFacade.setPageTitleLanguageKey('HEADER.OVERVIEW');
=======
    overviewForm: FormGroup;
    constructor(
        private router: Router,
        private appStateFacade: AppStateFacade,
        private test:FormBuilder
    ) {
        this.appStateFacade.setPageTitleLanguageKey('HEADER.OVERVIEW');
        this.overviewForm = this.test.group({
            text: new FormControl('', Validators.required),
            text1: new FormControl('', Validators.required),
            datum1: new FormControl('', Validators.required),
            tijd1: new FormControl('', Validators.required),
            opmerking: new FormControl(''),
        }); 
>>>>>>> 8688c8e... main,terms,privacy
    }

    ngOnInit() {

    }
<<<<<<< HEAD
=======
    updateOverview(){
        const text = this.overviewForm.get("text").value;
        const text1 = this.overviewForm.get("text1").value;
        const datum1 = this.overviewForm.get("datum1").value;
        const tijd1 = this.overviewForm.get("tijd1").value;
        const opmerking = this.overviewForm.get("opmerking").value;
        alert(text + ", " + text1 + ", " + datum1 + ", " + tijd1 + ", " + opmerking);
    }
>>>>>>> 8688c8e... main,terms,privacy
}
