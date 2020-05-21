import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationGuard,
         AuthService,
         UsersService,
         DivisionService,
         OrderService,
         MessageBusService,
         AutofocusDirective,
         ToolbarComponent,

        } from './';

@NgModule({
  declarations: [ToolbarComponent, AutofocusDirective],
  exports: [ToolbarComponent, AutofocusDirective],
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
        UsersService,
        DivisionService,
        OrderService,
        MessageBusService,
      ]
    };
  }
}


