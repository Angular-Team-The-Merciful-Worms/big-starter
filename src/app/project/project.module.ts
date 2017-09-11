import { DonateComponent } from './project-item/donate/donate.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectCategoriesComponent } from './project-categories/project-categories.component';

import { ProjectsFireService } from './projects-fire.service';
import { ProjectService } from './projects-local.service';
import { ProjectListItemsComponent } from './project-list-items/project-list-items.component';

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
    ProjectListItemsComponent,
    DonateComponent
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
