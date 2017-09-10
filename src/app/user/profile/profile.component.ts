import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string;
  user: User;

  formErrors = {
    'email': '',
    'firstname': '',
    'lastname': '',
    'name': '',
    'balance': '',
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Enter a valid email'
    },
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 40 characters long.',
    },
    'lastname': {
      'required': 'Last name name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 40 characters long.',
    },
    'name': {
      'required': 'Username name is required.',
      'minlength': 'Username name must be at least 4 characters long.',
      'maxlength': 'Username name cannot be more than 80 characters long.',
    },
    'balance': {
      'required': 'Balance is required.',
      'min': 'Balance should be a positive number',
    },
  };

  constructor(private authService: AuthService, private fb: FormBuilder) {

    this.user = { email: '', password: '', name: '', firstname: '', lastname: '', balance: 0 };
  }

  ngOnInit(): void {
    this.getUserData();
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'firstname': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]],
      'lastname': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]],
      'name': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]],
      'balance': ['', [
        Validators.required,
        Validators.min(0),
      ]],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  updateData(): void {
    console.log('update');
    const user = {
      email: this.userForm.value['email'],
      password: this.userForm.value['password'],
      firstname: this.userForm.value['firstname'],
      lastname: this.userForm.value['lastname'],
      balance: this.userForm.value['balance'],
    };

    this.authService.updateUserData(user);
  }

  changePassword(): void {
    console.log('pass');
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  getUserData() {
    this.authService.currentUserData()
      .subscribe(u => this.user = u,
      error => this.errorMessage = <any>error);
  }
}
