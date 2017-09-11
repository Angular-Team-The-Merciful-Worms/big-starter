import { UploadService } from './upload.service';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UploadService,
  ],
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided elsewhere!');
    }
  }
}
