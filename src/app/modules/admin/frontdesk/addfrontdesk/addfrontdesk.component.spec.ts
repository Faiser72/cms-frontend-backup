import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfrontdeskComponent } from './addfrontdesk.component';

describe('AddfrontdeskComponent', () => {
  let component: AddfrontdeskComponent;
  let fixture: ComponentFixture<AddfrontdeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfrontdeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfrontdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
