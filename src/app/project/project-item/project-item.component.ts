import { User } from './../../user/user';
import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectsFireService } from './../projects-fire.service';
import { AuthService } from '../../core/auth.service';
import { LoginService } from './../../shared/navigation/login-service/login.service';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  errorMessage: string;
  project: IProject;
  user: User;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _projectsFireService: ProjectsFireService,
    private auth: AuthService,
    private login: LoginService) {
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
        this.auth.currentUserData()
          .subscribe(user => {
            this.user = user;
            console.log(this.user);
          });
      });
  }




}
