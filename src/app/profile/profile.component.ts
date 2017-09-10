import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  errorMessage: string;
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.getUserData();

  }

  getUserData() {
    this.authService.currentUserData()
      .subscribe(u => this.user = u,
      error => this.errorMessage = <any>error);
  }
}
