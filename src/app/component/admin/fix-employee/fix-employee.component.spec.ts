import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixEmployeeComponent } from './fix-employee.component';

describe('FixEmployeeComponent', () => {
  let component: FixEmployeeComponent;
  let fixture: ComponentFixture<FixEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
