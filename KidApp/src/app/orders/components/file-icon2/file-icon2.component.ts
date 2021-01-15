import { Component, Input, OnInit } from '@angular/core';
import { OrderFile } from 'models';

@Component({
  selector: 'file-icon2',
  templateUrl: './file-icon2.component.html',
  styleUrls: ['./file-icon2.component.scss']
})
export class FileIcon2Component implements OnInit {

  @Input() file: OrderFile;

  constructor() { }

  ngOnInit(): void {
  }

}
