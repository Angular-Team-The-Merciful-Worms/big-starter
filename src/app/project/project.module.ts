import { CutStringPipe } from './../shared/cut-string.pipe';
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectCategoriesComponent } from './project-categories/project-categories.component';
import { CalculatePercentPipe } from '../shared/calculate-percent.pipe';

import { ProjectsFireService } from './projects-fire.service';
import { ProjectService } from './projects-local.service';
import { UserProjectsComponent } from './user-projects/user-projects.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectCategoriesComponent },
      { path: 'category/:category', component: ProjectsListComponent },
      { path: 'user/:id', component: UserProjectsComponent },
      {
        path: 'projects/:id',
        component: ProjectItemComponent
      }
    ])
  ],
  declarations: [
    ProjectsListComponent,
    ProjectItemComponent,
    ProjectCategoriesComponent,
    CalculatePercentPipe,
    CutStringPipe,
    UserProjectsComponent
  ],
  providers: [
    ProjectService,
    ProjectsFireService
  ]
})
export class ProjectModule { }
