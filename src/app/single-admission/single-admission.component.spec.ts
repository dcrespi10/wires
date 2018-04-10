import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAdmissionComponent } from './single-admission.component';

describe('SingleAdmissionComponent', () => {
  let component: SingleAdmissionComponent;
  let fixture: ComponentFixture<SingleAdmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAdmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
