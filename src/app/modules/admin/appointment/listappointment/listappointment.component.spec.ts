import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListappointmentComponent } from './listappointment.component';

describe('ListappointmentComponent', () => {
  let component: ListappointmentComponent;
  let fixture: ComponentFixture<ListappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
