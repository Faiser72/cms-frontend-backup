import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferalnoteComponent } from './referalnote.component';

describe('ReferalnoteComponent', () => {
  let component: ReferalnoteComponent;
  let fixture: ComponentFixture<ReferalnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferalnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferalnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
