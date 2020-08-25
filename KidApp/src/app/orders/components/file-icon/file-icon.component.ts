import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderFile } from 'models';


@Component({
  selector: 'file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss']
})
export class FileIconComponent implements OnInit {

  @Input() file: OrderFile;
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    this.delete.emit(this.file.id);
  }
}
