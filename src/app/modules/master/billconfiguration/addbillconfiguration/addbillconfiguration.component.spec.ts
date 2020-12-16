import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbillconfigurationComponent } from './addbillconfiguration.component';

describe('AddbillconfigurationComponent', () => {
  let component: AddbillconfigurationComponent;
  let fixture: ComponentFixture<AddbillconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbillconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbillconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
