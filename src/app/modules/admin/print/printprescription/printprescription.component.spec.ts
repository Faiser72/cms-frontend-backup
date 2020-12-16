import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintprescriptionComponent } from './printprescription.component';

describe('PrintprescriptionComponent', () => {
  let component: PrintprescriptionComponent;
  let fixture: ComponentFixture<PrintprescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintprescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
