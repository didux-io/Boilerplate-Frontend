import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebRtcProvider } from 'src/app/providers/webRtcProvider/webRtc.provider';
import { UserStateFacade } from 'src/app/state/user/user.facade';

@Component({
    selector: 'app-logout',
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(private route: Router,
                private webRtcProvider: WebRtcProvider,
                private userStateFacade: UserStateFacade) {}

    ngOnInit(): void {
        localStorage.clear();
        this.webRtcProvider.remoteDisconnect();
        this.userStateFacade.logout();
        this.route.navigate(['/login']);
    }
}
