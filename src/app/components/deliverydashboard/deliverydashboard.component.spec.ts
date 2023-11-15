import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverydashboardComponent } from './deliverydashboard.component';

describe('DeliverydashboardComponent', () => {
  let component: DeliverydashboardComponent;
  let fixture: ComponentFixture<DeliverydashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliverydashboardComponent]
    });
    fixture = TestBed.createComponent(DeliverydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
