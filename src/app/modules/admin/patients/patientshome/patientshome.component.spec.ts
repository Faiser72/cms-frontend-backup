import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientshomeComponent } from './patientshome.component';

describe('PatientshomeComponent', () => {
  let component: PatientshomeComponent;
  let fixture: ComponentFixture<PatientshomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientshomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
