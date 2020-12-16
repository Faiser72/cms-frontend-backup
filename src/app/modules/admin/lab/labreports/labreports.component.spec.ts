import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabreportsComponent } from './labreports.component';

describe('LabreportsComponent', () => {
  let component: LabreportsComponent;
  let fixture: ComponentFixture<LabreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
