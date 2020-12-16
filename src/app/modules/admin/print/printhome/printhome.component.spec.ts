import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinthomeComponent } from './printhome.component';

describe('PrinthomeComponent', () => {
  let component: PrinthomeComponent;
  let fixture: ComponentFixture<PrinthomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinthomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
