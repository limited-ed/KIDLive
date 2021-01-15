import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from 'models/order';
import { FormBuilder, Validators } from '@angular/forms';
import { mapToModel, OrderService } from 'core';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'view-dlg',
  templateUrl: './view-dlg.component.html',
  styleUrls: ['./view-dlg.component.scss']
})
export class ViewDlgComponent implements OnInit {
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() order: Order;
  @Output() orderChange = new EventEmitter<Order>();

  form = this.fb.group({
    rejectText: ['', [Validators.required, Validators.minLength(8)]],
  }, { updateOn: 'blur'});

  savingProgress: ClrLoadingState = ClrLoadingState.DEFAULT;

  get beforeSave(){
    return this.savingProgress === ClrLoadingState.DEFAULT;
  }

  get isError(){
    return false;
  }

  constructor(private orderService: OrderService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

  onApply(){
    this.order.statusId = 5;
    this.order.closeDate = new Date().toISOString();
    this.saveOrder();
  }

  onDiscard(){
    this.order.statusId = 4;
    this.saveOrder();
  }

  onCancel(){
    this.visible = false;
    this.form.reset();
    this.visibleChange.emit(false);
  }

  private saveOrder(){
    mapToModel(this.form, this.order);
    if (this.beforeSave){
      let subscription = this.orderService.edit(this.order).subscribe(
        order => {
          this.orderChange.emit(this.order);
          this.savingProgress = ClrLoadingState.SUCCESS;
        },
        error => {},
        () => {
          subscription.unsubscribe();
          this.savingProgress = ClrLoadingState.DEFAULT;
          this.form.reset();
          this.visible = false;
          this.visibleChange.emit(false);

        }
      );
    }
  }
}
