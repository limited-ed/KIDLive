import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Order } from 'models/order';
import { FormBuilder, Validators } from '@angular/forms';
import { mapToModel, OrderService } from 'core';
import { Configuration } from 'app.constants';
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

  url = Configuration.Server + '/api/file';

  constructor(private orderService: OrderService, private http: HttpClient, private fb: FormBuilder) {

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

  getDowloadLink(id: number){
    this.http.get(this.url + '/' + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      },
      responseType: 'blob'
    }).subscribe((res) => {
      let url = window.URL.createObjectURL(res);
      let pwa = window.open(url);
      console.log(res);
    });
  }

  deleteFile(id: number){
    this.http
    .delete(
      this.url + '/' + id,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token'),
        },
      }
    )
    .subscribe({
      complete: (() => {
        let i = this.order.orderFiles.findIndex(f => f.id === id);
        this.order.orderFiles.splice(i, 1);
      }).bind(this),
    });
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
