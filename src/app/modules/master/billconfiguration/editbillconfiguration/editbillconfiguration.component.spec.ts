import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbillconfigurationComponent } from './editbillconfiguration.component';

describe('EditbillconfigurationComponent', () => {
  let component: EditbillconfigurationComponent;
  let fixture: ComponentFixture<EditbillconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbillconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbillconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
