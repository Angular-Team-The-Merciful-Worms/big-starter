import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../core/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    ]),
  ],
  declarations: [
    ProfileComponent
  ]
})
export class UserModule { }
