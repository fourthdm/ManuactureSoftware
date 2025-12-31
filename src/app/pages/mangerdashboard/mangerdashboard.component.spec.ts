import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerdashboardComponent } from './mangerdashboard.component';

describe('MangerdashboardComponent', () => {
  let component: MangerdashboardComponent;
  let fixture: ComponentFixture<MangerdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangerdashboardComponent]
    });
    fixture = TestBed.createComponent(MangerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
