import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { UploadService } from '../../core/upload.service';

import { User } from './../../user/user';
import { IProject } from './../project';

@Component({
    selector: 'app-add-project-profile',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

    userForm: FormGroup;
    project = {
        authorName: '',
        projectId: -1,
        projectName: '',
        description: '',
        category: 'Individual',
        location: '',
        dateCreated: '',
        votes: 1,
        accumulatedFunds: 0,
        targetFunds: 0,
        image: null
    };
    selectedFiles: FileList;
    user: User;

    formErrors = {
        'projectname': '',
        'location': '',
        'targetFunds': '',
        'descirpiton': '',
    };

    validationMessages = {
        'projectname': {
            'required': 'Project name is required.',
            'minlength': 'Project name must be at least 4 characters long.',
            'maxlength': 'First name cannot be more than 25 characters long.',
        },
        'loaction': {
            'required': 'Location is required.',
            'minlength': 'Location must be at least 2 characters long.',
            'maxlength': 'Location cannot be more than 25 characters long.',
        },
        'descirpiton': {
            'required': 'Description is required.',
            'minlength': 'Description must be at least 250 characters long.',
            'maxlength': 'Description cannot be more than 25,000 characters long.',
        },
        'balance': {
            'required': 'Balance is required.',
            'min': 'Balance should be a non negative number',
        },
    };

    constructor(private authService: AuthService, private fb: FormBuilder, private uploadService: UploadService) {
    }

    ngOnInit(): void {
        // this.getUserData();
        this.buildForm();
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            'authorName': [''],
            'dateCreated': [''],
            'projectname': ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(25)
            ]],
            'location': ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25)
            ]],
            'category': [''],
            'description': ['', [
                Validators.required,
                Validators.minLength(250),
                Validators.maxLength(25000)
            ]],
            'targetFunds': ['', [
                Validators.required,
                Validators.min(1000),
            ]],
        });

        this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // reset validation messages
    }

    createProject() {
        console.log(this.project);
    }

    uploadProfilePic() {
    }

    detectFiles(event) {
        this.selectedFiles = event.target.files;
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
            .subscribe(u => {
                this.user = u;
                this.project.authorName = u.name;
            });
    }
}
