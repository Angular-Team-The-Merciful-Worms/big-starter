import { ProjectModule } from './../project/project.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../core/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserProjectsComponent } from './user-projects/user-projects.component';

@NgModule({
  imports: [
    ProjectModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'myprojects', component: UserProjectsComponent, canActivate: [AuthGuard] },
    ]),
  ],
  declarations: [
    ProfileComponent,
    UserProjectsComponent,
  ]
})
export class UserModule { }
