
import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from './../project-service';
import { ProjectsFireService } from './../projectsFire.service';

@Component({
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: IProject[] = [];
  filteredProjects: IProject[];
  gainedPercent: number = 0;
  defaultImageUrl: string = '../../../assets/no-image.jpg';
  errorMessage: string;
  categoryFilter: string;
  _listFilter: string;

  // to use for name filter
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
  }

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _projectService: ProjectService,
    private projectsFireService: ProjectsFireService) { }

  ngOnInit(): void {

    this.projectsFireService.getProjects()
      .subscribe((response) => console.log(response));

    this.categoryFilter = this._route.snapshot.paramMap.get('category');
    this._projectService.getProjectsByCategory(this.categoryFilter)
      .subscribe(projects => this.projects = projects,
      error => this.errorMessage = <any>error);
  }
}
