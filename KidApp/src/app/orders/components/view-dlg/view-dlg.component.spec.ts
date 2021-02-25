import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewDlgComponent } from './view-dlg.component';

describe('ViewDlgComponent', () => {
  let component: ViewDlgComponent;
  let fixture: ComponentFixture<ViewDlgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
