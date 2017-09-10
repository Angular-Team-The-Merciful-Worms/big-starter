import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { IProject } from "../../project/project";

import { ProjectsFireService } from './../../project/projects-fire.service';


@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {
  userProjects: IProject[];
  gainedPercent: number = 0;
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private projectsFireService: ProjectsFireService,
    public auth: AuthService) { }

    ngOnInit(): void {
      const userName = this._route.snapshot.paramMap.get('authorName');
      this.getProjects(userName);
    }
  
    getProjects(userName: string) {
      this.projectsFireService.getProjects()
        .subscribe(projects => { 
          this.userProjects = projects
          .filter(x => x.authorName.toLowerCase() === userName);
         },
        error => this.errorMessage = <any>error);
    }
}






