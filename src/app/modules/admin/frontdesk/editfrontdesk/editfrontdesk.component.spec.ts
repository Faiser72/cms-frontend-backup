import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfrontdeskComponent } from './editfrontdesk.component';

describe('EditfrontdeskComponent', () => {
  let component: EditfrontdeskComponent;
  let fixture: ComponentFixture<EditfrontdeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfrontdeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfrontdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
