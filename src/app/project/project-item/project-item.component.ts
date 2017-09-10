import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectsFireService } from './../projectsFire.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  errorMessage: string;
  project: IProject;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _projectsFireService: ProjectsFireService) {
  }

  ngOnInit() {
    const uid = this._route.snapshot.paramMap.get('id');

    this.getProject(uid);
  }
  getProject(uid: string) {
    this._projectsFireService.getProjectByUid(uid)
      .subscribe(project => {
        this.project = project;
      });
  }
}
