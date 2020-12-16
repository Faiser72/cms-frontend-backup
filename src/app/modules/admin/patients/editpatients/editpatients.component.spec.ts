import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpatientsComponent } from './editpatients.component';

describe('EditpatientsComponent', () => {
  let component: EditpatientsComponent;
  let fixture: ComponentFixture<EditpatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
