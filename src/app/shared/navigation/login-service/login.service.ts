import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../core/auth.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Injectable()
export class LoginService {

    constructor(private modalService: NgbModal, public auth: AuthService) { }
    openLoginModal() {
        const modalRef = this.modalService.open(UserLoginComponent);
        modalRef.result.then((result) => {
            if (result === 'Register') {
                this.openRegisterModal();
            }
        });
    }

    openRegisterModal() {
        const modalRef = this.modalService.open(RegisterFormComponent);
        modalRef.result.then((result) => {
            if (result === 'Login') {
                this.openLoginModal();
            }
        });
    }
}
