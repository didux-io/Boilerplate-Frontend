import { TestBed, waitForAsync } from '@angular/core/testing';
import { BuildNumberComponent } from "./build-number.component";
import {AppStateFacade} from "../../state/app/app.facade";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {Observable, of} from "rxjs";
import {take} from "rxjs/operators";

class MockAppStateFacade {
    buildNumber$: Observable<string> = of('1234');
}

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                BuildNumberComponent
            ],
            providers: [
                BuildNumberComponent,
                { provide: AppStateFacade, useClass: MockAppStateFacade }
            ],
            imports: [
                FontAwesomeTestingModule
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(BuildNumberComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as buildnumber '1234'`, () => {
        const fixture = TestBed.createComponent(BuildNumberComponent);
        const app = fixture.componentInstance;
        app.buildNumber$.pipe(take(1)).toPromise().then(result => {
            expect(result).toEqual('1234');
        })
    });

    it('should render buildnumber', () => {
        const fixture = TestBed.createComponent(BuildNumberComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('span').textContent).toContain('Build 1234');
    });
});
