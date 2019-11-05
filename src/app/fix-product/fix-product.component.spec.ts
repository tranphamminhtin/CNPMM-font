import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixProductComponent } from './fix-product.component';

describe('FixProductComponent', () => {
  let component: FixProductComponent;
  let fixture: ComponentFixture<FixProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
