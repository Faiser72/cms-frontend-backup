import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorrolemasterComponent } from './doctorrolemaster.component';

describe('DoctorrolemasterComponent', () => {
  let component: DoctorrolemasterComponent;
  let fixture: ComponentFixture<DoctorrolemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorrolemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorrolemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
