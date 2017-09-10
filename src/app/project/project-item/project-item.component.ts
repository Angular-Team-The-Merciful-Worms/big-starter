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
    private auth: AuthService,
    private login: LoginService) {
  }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id') - 1;
    this.getProject(id);
  }

  toggleVoteProject() {
    if (this.votedFor) {
      // const index = this.project.upvotedBy(user.$key)
      // this.project.upvotedBy.
      console.log('In');
    } else {
      console.log('not in array');
    }
    // this._projectsFireService.updateProjectByUid(this.user.$key, this.project)
    //   .then(_ => console.log('success'))
    //   .catch(error => console.log(error));
  }
  // 2JYOqqXO8yOG1K7cTgIb8nmegmf1
  getProject(id: number) {
    const uid = id.toString();
    this._projectsFireService.getProjectByUid(uid)
      .subscribe(project => {
        this.project = project;
        this.auth.currentUserData()
          .subscribe(user => {
            this.user = user;
            this.indexVotedfor = this.project.upvotedBy.indexOf(this.user.$key);
            this.votedFor = (this.indexVotedfor > -1) ? true : false;
            // console.log(this.user);
          });
      });
  }




}
