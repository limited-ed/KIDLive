import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ClrWizard, ClrLoadingState } from '@clr/angular';
import { Order, Division } from 'models';
import { OrderService, mapToModel } from 'core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'edit-dlg',
  templateUrl: './edit-dlg.component.html',
  styleUrls: ['./edit-dlg.component.scss']
})
export class EditDlgComponent implements OnInit, OnChanges {
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() order: Order;
  @Output() orderChange = new EventEmitter<Order>();

  @Input() divisions: Division[];

  savingProgress: ClrLoadingState = ClrLoadingState.DEFAULT;

  get beforeSave(){
    return this.savingProgress === ClrLoadingState.DEFAULT;
  }

  get isDone(){
    return this.savingProgress === ClrLoadingState.SUCCESS;
  }

  get isError(){
    return this.savingProgress === ClrLoadingState.ERROR;
  }

  form = this.fb.group({
    shortText: ['', [Validators.required, Validators.minLength(8)]],
    orderText: ['', [Validators.required, Validators.minLength(8)]],
    divisionId: ['', Validators.required],
    endDate: ['', Validators.required]
  }, { updateOn: 'blur'});

  constructor(private orderService: OrderService, private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes['visible'] !== 'undefined' && changes['visible'].currentValue) {
      this.order.endDate = (new Date(this.order.endDate)).toLocaleDateString();
      this.form.patchValue(this.order);
    }
  }

  ngOnInit(): void {
  }

  onCommit(){
    if (this.beforeSave)
    {
      this.savingProgress = ClrLoadingState.LOADING;
      mapToModel(this.form, this.order);
      if (!this.order.id) {
        const helper = new JwtHelperService();
        const token = helper.decodeToken(localStorage.getItem('id_token'));
        let subscription = this.orderService.add(this.order).subscribe(
            order => {
              this.orderChange.emit(order);
              this.savingProgress = ClrLoadingState.SUCCESS;
             },
            error => {
              this.savingProgress = ClrLoadingState.ERROR;

            },
            () => {
              subscription.unsubscribe();
            }
        );
      } else {
        let subscription = this.orderService.edit(this.order).subscribe(
          order => {
            this.orderChange.emit(this.order);
            this.savingProgress = ClrLoadingState.SUCCESS;
          },
          error => {},
          () => {
            subscription.unsubscribe();
          }
        );
      }
    }
    if (this.isDone)
    {
      this.savingProgress = ClrLoadingState.DEFAULT;
      this.form.reset();
      this.visible = false;
      this.visibleChange.emit(false);
    }


  }

  onCancel(){
    this.visible = false;
    this.savingProgress = ClrLoadingState.DEFAULT;
    this.form.reset();
    this.visibleChange.emit(false);
  }

}
