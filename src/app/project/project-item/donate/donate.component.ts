import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'donate-funds',
  templateUrl: './donate.component.html',
  styleUrls: ['../../../shared/navigation/form.component.css']
})
export class DonateComponent {
    @Input() thisId: string;
    money: number;
  constructor(
    public auth: AuthService,
    private router: Router) { }

    onClick() {
        console.log(this.money);
        console.log(this.thisId);
    }
}
