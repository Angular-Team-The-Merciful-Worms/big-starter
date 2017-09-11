import { DonateComponent } from './project-item/donate/donate.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectCategoriesComponent } from './project-categories/project-categories.component';
import { AddProjectComponent } from './add-project/add-project.component';

import { ProjectsFireService } from './projects-fire.service';
import { ProjectService } from './projects-local.service';
import { ProjectListItemsComponent } from './project-list-items/project-list-items.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'projects/new', component: AddProjectComponent },
      { path: 'category/:category', component: ProjectsListComponent },
      { path: 'projects', component: ProjectCategoriesComponent },
      {
        path: 'projects/:id',
        component: ProjectItemComponent
      }
    ]),
    ReactiveFormsModule,
  ],
  declarations: [
    ProjectsListComponent,
    ProjectItemComponent,
    ProjectCategoriesComponent,
    ProjectListItemsComponent,
    DonateComponent,
    AddProjectComponent
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
