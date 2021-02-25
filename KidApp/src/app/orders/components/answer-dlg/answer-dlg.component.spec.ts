import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnswerDlgComponent } from './answer-dlg.component';

describe('AnswerDlgComponent', () => {
  let component: AnswerDlgComponent;
  let fixture: ComponentFixture<AnswerDlgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
