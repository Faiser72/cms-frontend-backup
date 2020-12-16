import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreliminarycheckComponent } from './preliminarycheck.component';

describe('PreliminarycheckComponent', () => {
  let component: PreliminarycheckComponent;
  let fixture: ComponentFixture<PreliminarycheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreliminarycheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreliminarycheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
