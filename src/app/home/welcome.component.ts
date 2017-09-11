import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { LoginService } from '../shared/navigation/login-service/login.service';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    public pageTitle = 'Big Starter';

    constructor(public login: LoginService, public auth: AuthService) { }

    ngOnInit(): void {
        console.log(this.auth);
    }
}
