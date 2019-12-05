import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAmountComponent } from './detail-amount.component';

describe('DetailAmountComponent', () => {
  let component: DetailAmountComponent;
  let fixture: ComponentFixture<DetailAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
