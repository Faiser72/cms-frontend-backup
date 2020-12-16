import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdoctorsComponent } from './listdoctors.component';

describe('ListdoctorsComponent', () => {
  let component: ListdoctorsComponent;
  let fixture: ComponentFixture<ListdoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
