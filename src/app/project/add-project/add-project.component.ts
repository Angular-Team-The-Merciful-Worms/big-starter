import { Upload } from './../../core/upload';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AuthService } from '../../core/auth.service';
import { UploadService } from '../../core/upload.service';

import { User } from './../../user/user';
import { IProject } from './../project';
import { ProjectsFireService } from '../projects-fire.service';

@Component({
    selector: 'app-add-project-profile',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

    currentUpload: Upload;
    userForm: FormGroup;
    selectedFiles: FileList;
    user: User;
    project: IProject;
    uploaded = false;

    formErrors = {
        'projectname': '',
        'location': '',
        'targetFunds': '',
        'description': '',
    };

    validationMessages = {
        'projectname': {
            'required': 'Project name is required.',
            'minlength': 'Project name must be at least 4 characters long.',
            'maxlength': 'First name cannot be more than 25 characters long.',
        },
        'location': {
            'required': 'Location is required.',
            'minlength': 'Location must be at least 2 characters long.',
            'maxlength': 'Location cannot be more than 25 characters long.',
        },
        'targetFunds': {
            'required': 'Target funds is required.',
            'min': 'Target funds should be a higher than $1,000',
        },
        'description': {
            'required': 'Description is required.',
            'minlength': 'Description must be at least 250 characters long.',
            'maxlength': 'Description cannot be more than 25,000 characters long.',
        },
    };

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private uploadService: UploadService,
        private projectService: ProjectsFireService,
        private router: Router,
    ) {

        this.project = {
            authorName: 'aaa',
            projectId: -1,
            projectName: '',
            description: '',
            category: 'Individual',
            location: '',
            dateCreated: new DatePipe('en').transform(Date.now(), 'yyyy-MM-dd'),
            votes: 0,
            accumulatedFunds: 0,
            targetFunds: 1000,
            authorId: this.authService.currentUserId,
        };
    }

    ngOnInit(): void {
        this.getUserData();
        this.buildForm();
        this.getProjectId();
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
        const id = this.project.projectId;

        this.uploadProjectPic();
        this.projectService.createNewProject(this.project);
        this.projectService.setProjectId(this.project.projectId + 1);

        setTimeout(() => {
            this.router.navigate(['projects/' + id]);
        }, 500);

    }

    uploadProjectPic() {
        const file = this.selectedFiles.item(0);
        this.currentUpload = new Upload(file);
        this.uploadService
            .uploadProjectPicture(this.currentUpload, this.project.projectId);
    }

    detectFiles(event) {
        this.selectedFiles = event.target.files;
        this.uploaded = true;
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
                this.project.authorName = u.firstname + ' ' + u.lastname;
            });
    }
    getProjectId() {
        this.projectService
            .getNextProjectId()
            .subscribe((i) => {
                const id = +i['value'] || +i['$value'];
                this.project.projectId = id;
            });
    }
}
