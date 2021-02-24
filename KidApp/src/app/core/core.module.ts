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
         StatusTitlePipe,

        } from './';

@NgModule({
  declarations: [ToolbarComponent, AutofocusDirective, StatusTitlePipe],
  exports: [ToolbarComponent, AutofocusDirective, StatusTitlePipe],
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

  static forRoot(): ModuleWithProviders<CoreModule> {
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


