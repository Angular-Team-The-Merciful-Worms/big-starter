import { LoginService } from './navigation/login-service/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RegisterFormComponent } from './navigation/register-form/register-form.component';
import { UserLoginComponent } from './navigation/user-login/user-login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { CutStringPipe } from './cut-string.pipe';
import { CalculatePercentPipe } from './calculate-percent.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    declarations: [
        FooterComponent,
        NavigationComponent,
        UserLoginComponent,
        RegisterFormComponent,
        CalculatePercentPipe,
        CutStringPipe
    ],
    entryComponents: [
        UserLoginComponent,
        RegisterFormComponent,
    ],
    exports: [
        FooterComponent,
        NavigationComponent,
        CalculatePercentPipe,
        CutStringPipe,
        CommonModule,
        FormsModule
    ],
    providers: [
        LoginService,
    ]
})
export class SharedModule { }
