import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedfrontdesklistComponent } from './deletedfrontdesklist.component';

describe('DeletedfrontdesklistComponent', () => {
  let component: DeletedfrontdesklistComponent;
  let fixture: ComponentFixture<DeletedfrontdesklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedfrontdesklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedfrontdesklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
