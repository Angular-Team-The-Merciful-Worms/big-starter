import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginComponent } from './user-login/user-login.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserLoginComponent,
    RegisterFormComponent,
  ],
  entryComponents:
  [
    UserLoginComponent,
    RegisterFormComponent
  ]
})
export class LoginModule { }
