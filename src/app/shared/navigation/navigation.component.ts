import { Component, ViewChild, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { LoginService } from './login-service/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(public login: LoginService, public auth: AuthService) { }
}
