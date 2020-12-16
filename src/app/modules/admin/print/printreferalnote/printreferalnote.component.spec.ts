import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintreferalnoteComponent } from './printreferalnote.component';

describe('PrintreferalnoteComponent', () => {
  let component: PrintreferalnoteComponent;
  let fixture: ComponentFixture<PrintreferalnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintreferalnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintreferalnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
