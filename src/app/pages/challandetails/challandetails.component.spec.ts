import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallandetailsComponent } from './challandetails.component';

describe('ChallandetailsComponent', () => {
  let component: ChallandetailsComponent;
  let fixture: ComponentFixture<ChallandetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChallandetailsComponent]
    });
    fixture = TestBed.createComponent(ChallandetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
