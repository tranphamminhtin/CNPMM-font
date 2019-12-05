import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderAdminComponent } from './detail-order-admin.component';

describe('DetailOrderAdminComponent', () => {
  let component: DetailOrderAdminComponent;
  let fixture: ComponentFixture<DetailOrderAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOrderAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
