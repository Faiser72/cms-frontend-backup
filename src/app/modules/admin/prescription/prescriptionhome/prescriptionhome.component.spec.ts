import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionhomeComponent } from './prescriptionhome.component';

describe('PrescriptionhomeComponent', () => {
  let component: PrescriptionhomeComponent;
  let fixture: ComponentFixture<PrescriptionhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
