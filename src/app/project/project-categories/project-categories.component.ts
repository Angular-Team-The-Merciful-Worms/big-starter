
import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from './../projects-local.service';
import { ProjectsFireService } from './../projects-fire.service';

@Component({
  selector: 'app-project-categories',
  templateUrl: './project-categories.component.html',
  styleUrls: ['./project-categories.component.css']
})
export class ProjectCategoriesComponent implements OnInit {
  categories: string[];
  projects: IProject[] = [];
  individualProjects: IProject[];
  groupProjects: IProject[];
  communityProjects: IProject[];
  gainedPercent: number = 0;
  errorMessage: string;
  categoryFilter: string;
  projectsToDisplay: number = 4;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private projectsFireService: ProjectsFireService) { }

  ngOnInit(): void {
    this.getProjects();


  }

  getProjects() {
    this.projectsFireService.getProjects()
      .subscribe(projects => {
        this.projects = projects;

        this.individualProjects = this.projects
          .filter(x => x.category.toLowerCase() === 'individual')
          .splice(0, this.projectsToDisplay);

        this.groupProjects = this.projects
          .filter(x => x.category.toLowerCase() === 'group')
          .splice(0, this.projectsToDisplay);

        this.communityProjects = this.projects
          .filter(x => x.category.toLowerCase() === 'community')
          .splice(0, this.projectsToDisplay);

        // console.log(this.projects);
        // console.log(this.individualProjects);
        // console.log(this.groupProjects);
        // console.log(this.communityProjects);
      },
      error => this.errorMessage = <any>error);
  }
}
