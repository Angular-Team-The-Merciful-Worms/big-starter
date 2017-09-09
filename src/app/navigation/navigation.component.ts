import { Component, ViewChild } from '@angular/core';

import { UserLoginComponent } from '../shared/user-login/user-login.component';
import { RegisterFormComponent } from '../shared/register-form/register-form.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../core/authentication/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @ViewChild(UserLoginComponent) userLoginModal: UserLoginComponent;
  @ViewChild(RegisterFormComponent) RegisterModal: RegisterFormComponent;

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
