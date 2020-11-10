import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/languageProvider';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as QRCode from 'qrcode';
import { ConfigProvider } from 'src/app/providers/config/configProvider';
import { BaseComponent } from '../base-component/base-component';

declare const diduxWallet: any;

@Component({
    templateUrl: 'terms.page.html',
    styleUrls: ['terms.page.scss']
})
export class TermsPageComponent extends BaseComponent implements OnInit {
    languages = [];

    constructor(
        private translateService: TranslateService,
        private router: Router,
        private languageProvider: LanguageProvider,
        private configProvider: ConfigProvider,
    ) {
        super();
    }

    async ngOnInit() {
        await this.configProvider.getConfig();
        this.languages = this.languageProvider.getLanguages();
    }
}
