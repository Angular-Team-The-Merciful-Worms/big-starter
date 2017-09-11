
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
  individualProjects: IProject[];
  groupProjects: IProject[];
  communityProjects: IProject[];
  errorMessage: string;
  projectsToDisplay = 4;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private projectsFireService: ProjectsFireService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectsFireService.getProjects()
      .subscribe(projects => {
        this.individualProjects = projects
          .filter(x => x.category.toLowerCase() === 'individual')
          .splice(0, this.projectsToDisplay);

        this.groupProjects = projects
          .filter(x => x.category.toLowerCase() === 'group')
          .splice(0, this.projectsToDisplay);

        this.communityProjects = projects
          .filter(x => x.category.toLowerCase() === 'community')
          .splice(0, this.projectsToDisplay);
      },
      error => this.errorMessage = <any>error);
  }
}
