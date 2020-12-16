import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprescriptionComponent } from './listprescription.component';

describe('ListprescriptionComponent', () => {
  let component: ListprescriptionComponent;
  let fixture: ComponentFixture<ListprescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListprescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
