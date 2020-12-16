import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpatientdiagnosysdetailsComponent } from './viewpatientdiagnosysdetails.component';

describe('ViewpatientdiagnosysdetailsComponent', () => {
  let component: ViewpatientdiagnosysdetailsComponent;
  let fixture: ComponentFixture<ViewpatientdiagnosysdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpatientdiagnosysdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpatientdiagnosysdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
