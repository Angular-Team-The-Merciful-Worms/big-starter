import { ProjectService } from './../project-service';
import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private _projectService: ProjectService) {
  }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    console.log(id);
    this.getProject(id);
  }

  getProject(id: number) {
    this._projectService.getProject(id).subscribe(
      project => this.project = project,
      error => this.errorMessage = <any>error);
  }
}
