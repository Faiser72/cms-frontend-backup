import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbillconfigurationComponent } from './listbillconfiguration.component';

describe('ListbillconfigurationComponent', () => {
  let component: ListbillconfigurationComponent;
  let fixture: ComponentFixture<ListbillconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbillconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbillconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
