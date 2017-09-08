import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectsListComponent },
      // {
      //   path: 'projects/:id',
      //   canActivate: [ProjectGuardService],
      //   component: ProjectDetailComponent
      // }
    ])
  ],
  declarations: [ProjectsListComponent],
  providers: []
})
export class ProjectModule { }
