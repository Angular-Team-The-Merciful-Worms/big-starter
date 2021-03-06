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
  votedFor = false;
  indexVotedfor: number;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _projectsFireService: ProjectsFireService,
    public auth: AuthService,
    public login: LoginService) {
  }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.initialize(id);
  }
  toggleVoteProject() {
    if (this.votedFor) {
      this.project.upvotedBy.splice(this.indexVotedfor, 1);
    } else {
      this.project.upvotedBy.push(this.user.$key);
    }
    const uid = (this.project.projectId - 1).toString();
    this._projectsFireService.updateProjectByUid(uid, this.project)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }
  initialize(id: number) {
    const uid = id.toString();
    this._projectsFireService.getProjectByUid(uid)
      .subscribe(project => {
        this.project = project;
        this.auth.currentUserData()
          .subscribe(user => {
            this.user = user;
            this.indexVotedfor = this.project.upvotedBy.indexOf(this.user.$key);
            this.votedFor = (this.indexVotedfor > -1) ? true : false;
          });
      });
  }
}
