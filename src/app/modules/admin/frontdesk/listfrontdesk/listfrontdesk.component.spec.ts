import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfrontdeskComponent } from './listfrontdesk.component';

describe('ListfrontdeskComponent', () => {
  let component: ListfrontdeskComponent;
  let fixture: ComponentFixture<ListfrontdeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfrontdeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfrontdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
