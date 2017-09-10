
import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectsFireService } from './../projects-fire.service';

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
    private projectsFireService: ProjectsFireService) { }

  getProjects(category: string) {
    this.projectsFireService.getProjectsByCategory(this.categoryFilter)
      .subscribe(projects => this.projects = projects,
      error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.categoryFilter = this._route.snapshot.paramMap.get('category');
      this.getProjects(this.categoryFilter);
  }
}
