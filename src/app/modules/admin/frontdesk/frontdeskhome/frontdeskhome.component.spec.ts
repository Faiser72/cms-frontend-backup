import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdeskhomeComponent } from './frontdeskhome.component';

describe('FrontdeskhomeComponent', () => {
  let component: FrontdeskhomeComponent;
  let fixture: ComponentFixture<FrontdeskhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontdeskhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontdeskhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
