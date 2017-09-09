import { Component, ViewChild } from '@angular/core';
import * as jQuery from 'jquery';
import { UserLoginComponent } from './shared/user-login/user-login.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './core/authentication/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Big Starter';

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
