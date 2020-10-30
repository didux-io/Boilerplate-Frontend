import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-recovery-modal',
    templateUrl: './recoveryModal.component.html'
})
export class RecoveryModalComponent {

    constructor(private modalService: BsModalService) {}

    openModal(template: TemplateRef<any>) {
        this.modalService.show(template);
    }

    closeModal() {
        this.modalService.hide();
    }
}
