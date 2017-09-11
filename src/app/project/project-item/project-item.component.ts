import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectsFireService } from './../projects-fire.service';
import { AuthService } from "../../core/auth.service";

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
    private _projectsFireService: ProjectsFireService,
    public auth: AuthService) {
  }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id') - 1;
    this.getProject(id);
  }

  getProject(id: number) {
    const uid = id.toString();
    this._projectsFireService.getProjectByUid(uid)
      .subscribe(project => {
        this.project = project;
      });
  }
}
