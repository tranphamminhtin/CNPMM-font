import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEmployeeComponent } from './account-employee.component';

describe('AccountEmployeeComponent', () => {
  let component: AccountEmployeeComponent;
  let fixture: ComponentFixture<AccountEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
