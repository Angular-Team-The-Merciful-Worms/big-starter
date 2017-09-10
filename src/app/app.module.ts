import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProjectModule } from './project/project.module';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ProfileComponent,
    ContactsComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CoreModule,
    RouterModule.forRoot([
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' } // 404 to be implemented
    ]),
    ProjectModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
