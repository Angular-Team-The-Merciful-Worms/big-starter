import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { IProject } from "../../project/project";
import { User } from "../user";

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
  userId: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private projectsFireService: ProjectsFireService,
    public auth: AuthService) { }

    ngOnInit(): void {
      this.getUser();
      this.getProjects(this.userId);
    }
  
    getUser() {
      this.userId = this.auth.currentUserId;
      console.log(this.userId);
    }
    getProjects(id: string) {
      this.projectsFireService.getProjects()
        .subscribe(projects => { 
          this.userProjects = projects
          .filter(x => x.authorId === id);
         },
        error => this.errorMessage = <any>error);
    }
}

// vAsRmvQAoWg9VtqYhzis1c5Udcp2






