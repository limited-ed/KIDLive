import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, OrderFile } from 'models';
import { FormBuilder, Validators } from '@angular/forms';
import {
  UploaderOptions,
  UploadFile,
  UploadInput,
  UploadOutput,
  UploadStatus,
} from 'ngx-uploader';
import { ClrWizard, ClrLoadingState } from '@clr/angular';
import { OrderService } from 'core';

@Component({
  selector: 'answer-dlg',
  templateUrl: './answer-dlg.component.html',
  styleUrls: ['./answer-dlg.component.scss'],
})
export class AnswerDlgComponent implements OnInit {
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input()
  get order() {
    return this._order;
  }
  set order(order: Order) {
    this._order = order;
    if (order) {
      this.form.setValue({ answer: this.order.answer });
    }
  }
  private _order: Order;
  @Output() orderChange = new EventEmitter<Order>();

  @ViewChild('wizard') wizard: ClrWizard;

  uploadProgress: number = 0;

  options: any;

  savingProgress: ClrLoadingState = ClrLoadingState.DEFAULT;

  get beforeSave() {
    return this.savingProgress === ClrLoadingState.DEFAULT;
  }

  get isDone() {
    return this.savingProgress === ClrLoadingState.SUCCESS;
  }

  get isError() {
    return this.savingProgress === ClrLoadingState.ERROR;
  }

  url = 'http://localhost:5000/api/file';
  formData: FormData;
  uploadFiles: UploadFile[] = new Array<UploadFile>();
  uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
  form = this.fb.group({
    answer: ['', [Validators.required, Validators.minLength(8)]],
  });
  dragOver: boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private orderSrv: OrderService
  ) {
    this.options = { concurrency: 1, maxUploads: 3, maxFileSize: 1000000 };
  }

  ngOnInit(): void {}

  onCancel() {
    if (this.uploadFiles.length > 0) {
      this.onFinish();
      return;
    }
    this.http
      .patch(
        this.url + '/' + this._order.id,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('id_token'),
          },
        }
      )
      .subscribe({
        complete: (() => {
          this.onFinish();
        }).bind(this),
      });
  }

  onCommit() {
    this.order.answer = this.form.get('answer').value;
    this._order.statusId = 3;
    this.orderSrv.edit(this.order).subscribe(
      (ok) => {
        this.orderChange.emit(this.order);
      },
      (error) => {},
      () => {
        this.wizard.reset();
        this.form.reset();
        this.uploadFiles = [];
        this.visibleChange.emit(false);
      }
    );
  }

  onAnswer() {
    this.wizard.next();
  }

  onFinish() {
    this.wizard.reset();
    this.form.reset();
    this.uploadFiles = [];
    this.visibleChange.emit(false);
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: this.url,
        method: 'POST',
        data: { orderId: this.order.id + '' },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token'),
        },
      };

      this.uploadInput.emit(event);
    } else if (
      output.type === 'addedToQueue' &&
      typeof output.file !== 'undefined'
    ) {
      this.uploadFiles.push(output.file);
      console.log(output.file.name + ' add');
    } else if (
      output.type === 'uploading' &&
      typeof output.file !== 'undefined'
    ) {
      const index = this.uploadFiles.findIndex(
        (file) =>
          typeof output.file !== 'undefined' && file.id === output.file.id
      );
      this.uploadFiles[index] = output.file;
      this.uploadProgress = output.file.progress.data.percentage;
    } else if (output.type === 'done') {
      let res = output.file.response as OrderFile;
      this.order.orderFiles.push(res);
      this.uploadProgress = 0;
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.uploadFiles = this.uploadFiles.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (
      output.type === 'rejected' &&
      typeof output.file !== 'undefined'
    ) {
      console.log(output.file.name + ' rejected');
    }

    // this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }

  onDeleteFile(file: OrderFile) {
    this.http
      .delete(
        this.url + '/' + file.id,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('id_token'),
          },
        }
      )
      .subscribe({
        complete: (() => {
          var i = this._order.orderFiles.findIndex(f => f.id === file.id);
          this._order.orderFiles.splice(i, 1);
        }).bind(this),
      });
  }
}
