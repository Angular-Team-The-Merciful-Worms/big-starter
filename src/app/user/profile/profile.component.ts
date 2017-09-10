import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { UploadService } from '../../core/upload.service';
import { User } from '../user';
import { Upload } from '../../core/upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string;
  user: User;
  updated = false;
  resetPass = false;
  limitExceedMsg = 'Password reset already requested. Limit Exceeded. Try again later!';
  passResetMsg = 'Password reset requested. Check your email for instructions.';
  passmg: string;

  selectedFiles: FileList;
  currentUpload: Upload;

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
      'min': 'Balance should be a non negative number',
    },
  };

  constructor(private authService: AuthService, private fb: FormBuilder, private uploadService: UploadService) {
    this.user = {
      email: '',
      password: '',
      name: '',
      firstname: '',
      lastname: '',
      balance: 0,
      picture: { url: '' }
    };
  }

  ngOnInit(): void {
    this.getUserData();
    this.getUserProfilePicture();
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
    const user = {
      email: this.userForm.value['email'],
      password: this.userForm.value['password'],
      firstname: this.userForm.value['firstname'],
      lastname: this.userForm.value['lastname'],
      balance: this.userForm.value['balance'],
    };

    this.authService.updateUserData(user);
    this.updated = true;

    setTimeout(() => {
      this.updated = false;
    }, 3000);
  }

  changePassword(): void {
    this.authService.resetPassword(this.user.email)
      .then(() => {
        this.passmg = this.passResetMsg;
        this.resetPass = true;
      })
      .catch(() => {
        this.passmg = this.limitExceedMsg;
        this.resetPass = true;
      });

    setTimeout(() => {
      this.resetPass = false;
      this.passmg = '';
    }, 3000);
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    this.updated = false;

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

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.uploadProfilePic();
  }

  uploadProfilePic() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService
      .uploadProfilePicture(this.currentUpload);
  }

  getUserData() {
    this.authService.currentUserData()
      .subscribe(u => {
        const pic = this.user.picture;
        this.user = u;
        this.user.picture = pic;
      },
      error => this.errorMessage = <any>error);
  }

  getUserProfilePicture() {
    this.uploadService.getProfilePicture()
      .subscribe(p => {
        const keys = Object.keys(p)[0];
        if (p[keys]) {
          this.user.picture = p[keys];
        }
      });
  }
}
