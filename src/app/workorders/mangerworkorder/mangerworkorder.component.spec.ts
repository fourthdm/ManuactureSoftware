import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerworkorderComponent } from './mangerworkorder.component';

describe('MangerworkorderComponent', () => {
  let component: MangerworkorderComponent;
  let fixture: ComponentFixture<MangerworkorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangerworkorderComponent]
    });
    fixture = TestBed.createComponent(MangerworkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
