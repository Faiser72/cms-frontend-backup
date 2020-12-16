import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicehomeComponent } from './invoicehome.component';

describe('InvoicehomeComponent', () => {
  let component: InvoicehomeComponent;
  let fixture: ComponentFixture<InvoicehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicehomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
