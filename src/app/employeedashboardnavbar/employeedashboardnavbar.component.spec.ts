import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedashboardnavbarComponent } from './employeedashboardnavbar.component';

describe('EmployeedashboardnavbarComponent', () => {
  let component: EmployeedashboardnavbarComponent;
  let fixture: ComponentFixture<EmployeedashboardnavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeedashboardnavbarComponent]
    });
    fixture = TestBed.createComponent(EmployeedashboardnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
