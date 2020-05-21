import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { CoreModule } from 'core/core.module';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CoreModule,
    ClarityModule
  ]
})
export class OrdersModule { }
