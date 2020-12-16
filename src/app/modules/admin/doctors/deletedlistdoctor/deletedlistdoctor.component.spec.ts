import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedlistdoctorComponent } from './deletedlistdoctor.component';

describe('DeletedlistdoctorComponent', () => {
  let component: DeletedlistdoctorComponent;
  let fixture: ComponentFixture<DeletedlistdoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedlistdoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedlistdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
