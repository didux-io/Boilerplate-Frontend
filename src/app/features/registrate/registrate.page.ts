import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { errorObject } from 'rxjs/internal-compatibility';
import { skip, takeUntil } from 'rxjs/operators';
import { UserStateFacade } from 'src/app/state/user/user.facade';
import { UserStateModule } from 'src/app/state/user/user.module';
import { BaseComponent } from '../base-component/base-component';

@Component({
    templateUrl: 'registrate.page.html',
    styleUrls: ['registrate.page.scss']
})
export class RegistratePageComponent extends BaseComponent implements OnInit {
    registrateForm: FormGroup;

    websocketDisconnected = false;
    registratedEmail: string;

    constructor(
        private formBuilder: FormBuilder,
        private userStateFacade: UserStateFacade,
        private toastr: ToastrService
    ) {
        super();

        this.registrateForm = this.formBuilder.group({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.userStateFacade.registrationError$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((error) => {
            console.log('RegistratePageComponent registrationError$:', error);
            if (error) {
                this.toastr.error('Registration failure');
            }
        });
        this.userStateFacade.registratedEmail$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((email) => {
            console.log('RegistratePageComponent registratedEmail$');
            if (email) {
                this.registratedEmail = email;
            }
        });
    }

    registrate() {
        const email = this.registrateForm.get('email').value;
        const password = this.registrateForm.get('password').value;
        this.userStateFacade.registrate(email, password);
    }
}
