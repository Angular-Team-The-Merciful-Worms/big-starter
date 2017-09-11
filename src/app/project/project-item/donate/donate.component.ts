import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../core/auth.service';
import { ProjectsFireService } from "../../projects-fire.service";
import { IProject } from '../../project';

@Component({
    selector: 'donate-funds',
    templateUrl: './donate.component.html',
    styleUrls: ['../../../shared/navigation/form.component.css']
})
export class DonateComponent implements OnInit {
    @Input() thisId: string;
    money: number;
    project: IProject;
    constructor(
        public auth: AuthService,
        private router: Router,
        private _projectsFireService: ProjectsFireService) { }

    ngOnInit(): void {
        this.initialize(+this.thisId);
    }
    onClick() {
        if (this.money && this.thisId) {
            this.addDonation(this.money);
        }
    }

    addDonation(ammount: number) {
        let funds = +this.project.accumulatedFunds;
        funds += ammount;
        this.project.accumulatedFunds = funds;
        const uid = (this.project.projectId - 1).toString();
        this._projectsFireService.updateProjectByUid(uid, this.project)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    initialize(id: number) {
        const uid = (id - 1).toString();
        this._projectsFireService.getProjectByUid(uid)
            .subscribe(project => {
                this.project = project;
            });
    }
}
