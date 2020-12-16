import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillconfigurationhomeComponent } from './billconfigurationhome.component';

describe('BillconfigurationhomeComponent', () => {
  let component: BillconfigurationhomeComponent;
  let fixture: ComponentFixture<BillconfigurationhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillconfigurationhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillconfigurationhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
