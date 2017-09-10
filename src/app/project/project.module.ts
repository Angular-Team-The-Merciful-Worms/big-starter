import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectCategoriesComponent } from './project-categories/project-categories.component';
import { CalculatePercentPipe } from '../shared/calculate-percent.pipe';

import { ProjectsFireService } from './projects-fire.service';
import { ProjectService } from './projects-local.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectCategoriesComponent },
      { path: 'category/:category', component: ProjectsListComponent },
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
    CalculatePercentPipe
  ],
  providers: [
    ProjectService,
    ProjectsFireService
  ]
})
export class ProjectModule { }
