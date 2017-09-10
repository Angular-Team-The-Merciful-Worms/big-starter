import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ProjectService } from './../projects-local.service';
import { ProjectsFireService } from './../projects-fire.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {
  projects: IProject[] = [];
  userProjects: IProject[];
  gainedPercent: number = 0;
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private projectsFireService: ProjectsFireService,
    private modalService: NgbModal,
    public auth: AuthService) { }

    ngOnInit(): void {
      this.getProjects();
      const userName = this._route.snapshot.paramMap.get('authorName');
      this.userProjects = this.projects
      .filter(x => x.authorName.toLowerCase() === userName);
    }
  
    getProjects() {
      this.projectsFireService.getProjects()
        .subscribe(projects => this.projects = projects,
        error => this.errorMessage = <any>error);
    }
}






