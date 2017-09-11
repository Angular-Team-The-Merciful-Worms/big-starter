import { IProject } from './../project';

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { UploadService } from '../../core/upload.service';

@Component({
    selector: 'app-add-project-profile',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

    userForm: FormGroup;

    project: IProject;

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

        this.project = {
            projectId: -1,
            projectName: '',
            authorName: '',
            description: '',
            category: '',
            location: '',
            dateCreated: '',
            votes: 1,
            accumulatedFunds: 0,
            targetFunds: 0,
            image: null
        };
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.userForm = this.fb.group({
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
            'descirpiton': ['', [
                Validators.required,
                Validators.minLength(250),
                Validators.maxLength(25000)
            ]],
            'targetFunds': ['', [
                Validators.required,
                Validators.min(1000),
            ]],
        });

        // this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
        // this.onValueChanged(); // reset validation messages
    }
    updateData(): void {
        const user = {
            email: this.userForm.value['email'],
            password: this.userForm.value['password'],
            firstname: this.userForm.value['firstname'],
            lastname: this.userForm.value['lastname'],
            name: this.userForm.value['name'],
            balance: this.userForm.value['balance'],
        };

        this.authService.updateUserData(user);
    }

    createProject() {

    }

    detectFiles(event) {
    }
}
