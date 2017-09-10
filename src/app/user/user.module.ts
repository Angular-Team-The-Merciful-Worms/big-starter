import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../core/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserProjectsComponent } from "./user-projects/user-projects.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'user/projects/:id', component: UserProjectsComponent, canActivate: [AuthGuard] },
    ]),
  ],
  declarations: [
    ProfileComponent
  ]
})
export class UserModule { }
