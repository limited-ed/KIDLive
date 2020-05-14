import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationGuard,
         AuthService,
         MessageBusService,
        } from './';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule {

/*  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }*/

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationGuard,
        AuthService,
        MessageBusService,
      ]
    };
  }
}


