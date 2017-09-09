import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';

import { AuthService } from './auth.service';

@NgModule({
  providers: [
    AuthService
  ],
})

export class CoreModule {

  constructor( @Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided elsewhere!');
    }
  }
}
