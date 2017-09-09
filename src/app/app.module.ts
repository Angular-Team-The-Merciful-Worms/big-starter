import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProjectModule } from './project/project.module';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginModalComponent } from './shared/login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ContactsComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' } // 404 to be implemented
    ]),
    ProjectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
