import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectCategoriesComponent } from './project-categories/project-categories.component';

import { ProjectsFireService } from './projects-fire.service';
import { ProjectService } from './projects-local.service';
import { ProjectListItemsComponent } from './project-list-items/project-list-items.component';
import { AddProjectComponent } from './add-project/add-project.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'category/:category', component: ProjectsListComponent },
      { path: 'projects/add-project', component: AddProjectComponent },
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
    ProjectListItemsComponent,
    AddProjectComponent,
  ],
  providers: [
    ProjectService,
    ProjectsFireService
  ],
  exports: [
    ProjectListItemsComponent
  ]
})
export class ProjectModule { }
