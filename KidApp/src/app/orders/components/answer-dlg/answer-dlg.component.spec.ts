import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerDlgComponent } from './answer-dlg.component';

describe('AnswerDlgComponent', () => {
  let component: AnswerDlgComponent;
  let fixture: ComponentFixture<AnswerDlgComponent>;

  beforeEach(async(() => {
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
