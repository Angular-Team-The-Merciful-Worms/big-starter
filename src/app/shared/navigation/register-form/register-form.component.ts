import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';


@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['../form.component.css']
})
export class RegisterFormComponent implements OnInit {
    userForm: FormGroup;
    userExists = false; // set to true when password reset is triggered
    formErrors = {
        'email': '',
        'password': '',
        'firstname': '',
        'lastname': '',
    };

    validationMessages = {
        'email': {
            'required': 'Email is required.',
            'email': 'Enter a valid email'
        },
        'password': {
            'required': 'Password is required.',
            'pattern': 'Password must be include at one letter and one number.',
            'minlength': 'Password must be at least 6 characters long.',
            'maxlength': 'Password cannot be more than 40 characters long.',
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
        }
    };

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        this.buildForm();
    }

    signup(): void {
        const user = {
            email: this.userForm.value['email'],
            password: this.userForm.value['password'],
            firstname: this.userForm.value['firstname'],
            lastname: this.userForm.value['lastname'],
        };

        this.auth.emailSignUp(user)
            .then(() => {
                this.activeModal.close('Registered');
            })
            .catch((error) => {
                this.userExists = true;
            });
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]],
            'password': ['', [
                Validators.required,
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(2),
                Validators.maxLength(40)
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
            ]]
        });

        this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // reset validation messages
    }

    // Updates validation state on form changes.
    onValueChanged(data?: any) {
        if (!this.userForm) { return; }
        const form = this.userForm;
        for (const field in this.formErrors) {
            if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {

                // clear previous error message (if any)
                this.formErrors[field] = '';
                this.userExists = false;

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
}
