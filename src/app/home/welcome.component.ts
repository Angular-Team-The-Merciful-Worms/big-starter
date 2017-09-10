import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    public pageTitle = 'Big Starter';

    constructor(private modalService: NgbModal, public auth: AuthService) { }

    ngOnInit(): void {
        console.log(this.auth)
    }
}
