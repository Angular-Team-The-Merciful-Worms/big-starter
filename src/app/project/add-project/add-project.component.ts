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
        'authorName': '',
        'targetFunds': '',
        'descirpiton': '',
        'cateogry': '',
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
    }

    createProject() {

    }

    detectFiles(event) {
    }
}
