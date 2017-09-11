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
  projects: IProject[];
  userProjects: IProject[];
  gainedPercent: number = 0;
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private projectsFireService: ProjectsFireService,
    public auth: AuthService) { }
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log(this.listFilter);
        this.userProjects = this.listFilter ? this.performFilter(this.listFilter) : this.projects;
    }

    performFilter(filterBy: string): IProject[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.projects.filter((product: IProject) =>
            product.projectName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

    ngOnInit(): void {
      this.getUser();
    }
  
    getUser() {
      this.auth.currentUserData()
      .subscribe(currentUser => {
        this.getProjects(currentUser.$key);
      });
    }
    getProjects(id: string) {
      this.projectsFireService.getProjects()
        .subscribe(projects => { 
          this.projects = projects
          .filter(x => x.authorId === id);
          this.userProjects = this.projects;
         },
        error => this.errorMessage = <any>error);
    }
}

// vAsRmvQAoWg9VtqYhzis1c5Udcp2






