import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgUploaderModule } from 'ngx-uploader';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { CoreModule } from 'core/core.module';
import { EditDlgComponent } from './components/edit-dlg/edit-dlg.component';
import { AnswerDlgComponent } from './components/answer-dlg/answer-dlg.component';
import { FileIconComponent } from './components/file-icon/file-icon.component';


@NgModule({
  declarations: [OrdersComponent, EditDlgComponent, AnswerDlgComponent, FileIconComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgUploaderModule,
    OrdersRoutingModule,
    CoreModule,
    ClarityModule
  ]
})
export class OrdersModule { }
