import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixRightComponent } from './fix-right.component';

describe('FixRightComponent', () => {
  let component: FixRightComponent;
  let fixture: ComponentFixture<FixRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
