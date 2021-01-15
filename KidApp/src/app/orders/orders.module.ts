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
import { ViewDlgComponent } from './components/view-dlg/view-dlg.component';
import { FileIcon2Component } from './components/file-icon2/file-icon2.component';


@NgModule({
  declarations: [OrdersComponent, EditDlgComponent, AnswerDlgComponent, FileIconComponent, ViewDlgComponent, FileIcon2Component],
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
