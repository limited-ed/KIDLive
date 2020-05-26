import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { CoreModule } from 'core/core.module';
import { ClarityModule } from '@clr/angular';
import { EditDlgComponent } from './components/edit-dlg/edit-dlg.component';


@NgModule({
  declarations: [OrdersComponent, EditDlgComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    CoreModule,
    ClarityModule
  ]
})
export class OrdersModule { }
