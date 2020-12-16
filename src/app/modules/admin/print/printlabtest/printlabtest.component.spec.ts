import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintlabtestComponent } from './printlabtest.component';

describe('PrintlabtestComponent', () => {
  let component: PrintlabtestComponent;
  let fixture: ComponentFixture<PrintlabtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintlabtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintlabtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
