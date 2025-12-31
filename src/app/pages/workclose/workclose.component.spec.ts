import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkcloseComponent } from './workclose.component';

describe('WorkcloseComponent', () => {
  let component: WorkcloseComponent;
  let fixture: ComponentFixture<WorkcloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkcloseComponent]
    });
    fixture = TestBed.createComponent(WorkcloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
