import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileIcon2Component } from './file-icon2.component';

describe('FileIcon2Component', () => {
  let component: FileIcon2Component;
  let fixture: ComponentFixture<FileIcon2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileIcon2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileIcon2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
