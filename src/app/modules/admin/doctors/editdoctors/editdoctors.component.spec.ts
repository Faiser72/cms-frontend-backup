import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdoctorsComponent } from './editdoctors.component';

describe('EditdoctorsComponent', () => {
  let component: EditdoctorsComponent;
  let fixture: ComponentFixture<EditdoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
