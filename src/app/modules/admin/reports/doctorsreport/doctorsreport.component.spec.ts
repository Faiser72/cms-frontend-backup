import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsreportComponent } from './doctorsreport.component';

describe('DoctorsreportComponent', () => {
  let component: DoctorsreportComponent;
  let fixture: ComponentFixture<DoctorsreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
