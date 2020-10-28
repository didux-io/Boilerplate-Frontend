import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/languageProvider';
import { first, skip, takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as QRCode from 'qrcode';
import { ConfigProvider } from 'src/app/providers/config/configProvider';
import { BaseComponent } from '../base-component/base-component';
import { WebRtcProvider } from 'src/app/providers/webRtcProvider/webRtc.provider';
import { UserStateFacade } from 'src/app/state/user/user.facade';
import { AppStateFacade } from 'src/app/state/app/app.facade';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPageComponent extends BaseComponent implements OnInit {
    loginForm: FormGroup;

    websocketDisconnected = false;

    @ViewChild('qrCodeCanvas', null)
    qrCodeCanvas: ElementRef;

    mobileLoginUrl: string;

    emailEnabled$ = this.appStateFacade.emailEnabled$;
    webRtcEnabled$ = this.appStateFacade.webRtcEnabled$;

    constructor(
        private configProvider: ConfigProvider,
        private webRtcProvider: WebRtcProvider,
        private userStateFacade: UserStateFacade,
        private router: Router,
        private ngZone: NgZone,
        private appStateFacade: AppStateFacade,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
    ) {
        super();

        this.loginForm = this.formBuilder.group({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.activatedRoute.queryParams.subscribe((params: Params) => {
            if (params.emailVerified && params.emailVerified === 'true') {
                this.toastr.success('Email verification success! Please login');
            } else if (params.emailVerified && params.emailVerified === 'false') {
                this.toastr.error('Email verification failed!');
            }
        });
    }

    async ngOnInit() {
        await this.configProvider.getConfig();
        this.appStateFacade.setAuthWsUrl();
        this.appStateFacade.authWsUrl$.pipe(takeUntil(this.destroy$)).subscribe((signalingUrl) => {
            console.log('authWsUrl$:', signalingUrl);
            if (signalingUrl) {
                this.setupWebRtc(signalingUrl);
            }
        });

        this.userStateFacade.userLoginError$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((error) => {
            console.log('userLoginError$:', error);
            if (error) {
                console.error(error);
                this.toastr.error('Login failed');
            }
        });
        this.userStateFacade.accessToken$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((token) => {
            console.log('accessToken$:', token);
            if (token) {
                this.ngZone.run(() => {
                    this.router.navigate(['home/overview']);
                });
            }
        });
    }

    async setupWebRtc(signalingUrl: string) {
        const config = await this.configProvider.getConfig()
        this.webRtcProvider.setConfig({
            signalingUrl,
            isHost: true
        });

        this.webRtcProvider.uuid$.pipe(takeUntil(this.destroy$)).subscribe(uuid => {
            if (uuid != null) {
                const canvas = this.qrCodeCanvas.nativeElement as HTMLCanvasElement;
                this.websocketDisconnected = false;
                QRCode.toCanvas(canvas, `p2p:${uuid}:${encodeURIComponent(signalingUrl)}`, {
                    width: 210
                });
                this.mobileLoginUrl = `diduxio://didux.io/p2p?uuid=${uuid}&wsUrl=${signalingUrl}`;
            }
        });
        this.webRtcProvider.websocketConnectionClosed$.pipe(takeUntil(this.destroy$)).subscribe((closed) => {
            if (closed) {
                this.websocketDisconnected = true;
            }
        });
        this.webRtcProvider.receivedActions$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((data) => {
            console.log('Received:', data);
            if (data) {
                // When the client is connected
                if (data.action === 'p2pConnected' && data.p2pConnected) {
                    // Send an identify by email request
                    const timestamp = new Date();
                    const credentials = {
                        credentials: [
                            { key: 'EMAIL', provider: 'EMAIL', name: 'Email' },
                        ],
                        by: config.appName,
                        description: config.appDescription
                    };
                    this.webRtcProvider.sendData('identify', { request: credentials, type: 'email', timestamp, url: config.backendUrl, login: true });
                }
                if (data.token) {
                    // Set the token
                    this.userStateFacade.setAccessToken(data.token);
                }
            }
        });
        this.webRtcProvider.launchWebsocketClient();
    }

    refreshWebsocketDisconnect() {
        this.webRtcProvider.launchWebsocketClient();
    }

    login() {
        console.log('LOGIN!');
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;
        this.userStateFacade.userLogin(email, password);
    }
}
