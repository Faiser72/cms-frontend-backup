import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpatienthistoryComponent } from './listpatienthistory.component';

describe('ListpatienthistoryComponent', () => {
  let component: ListpatienthistoryComponent;
  let fixture: ComponentFixture<ListpatienthistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpatienthistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpatienthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
