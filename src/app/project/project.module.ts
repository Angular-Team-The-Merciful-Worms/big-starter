import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectCategoriesComponent } from './project-categories/project-categories.component';

import { ProjectsFireService } from './projects-fire.service';
import { ProjectService } from './projects-local.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'category/:category', component: ProjectsListComponent },
      { path: 'projects', component: ProjectCategoriesComponent },
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
  ],
  providers: [
    ProjectService,
    ProjectsFireService
  ]
})
export class ProjectModule { }
