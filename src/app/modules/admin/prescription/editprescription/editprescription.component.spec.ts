import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprescriptionComponent } from './editprescription.component';

describe('EditprescriptionComponent', () => {
  let component: EditprescriptionComponent;
  let fixture: ComponentFixture<EditprescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
