import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './../projects.service';
import { IProject } from '../project';

@Component({
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: IProject[];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects();
      // .subscribe(projs => {
      //   this.projects = projs;
      // });
  }

}
