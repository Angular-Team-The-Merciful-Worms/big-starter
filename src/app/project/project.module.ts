import { ProjectService } from './project-service';
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectCategoriesComponent } from './project-categories/project-categories.component';
import { CalculatePercentPipe } from "../shared/calculate-percent.pipe";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectCategoriesComponent },
      { path: 'category/:category', component: ProjectsListComponent },
      {
        path: 'projects/:id',
        //canActivate: [ProjectGuardService],
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
    ProjectService
  ]
})
export class ProjectModule { }
