import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectsListComponent },
      {
        path: 'projects/:id',
        //canActivate: [ProjectGuardService],
        component: ProjectItemComponent
      }
    ])
  ],
  declarations: [ProjectsListComponent, ProjectItemComponent],
  providers: []
})
export class ProjectModule { }
