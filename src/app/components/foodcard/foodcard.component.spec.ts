import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodcardComponent } from './foodcard.component';

describe('FoodcardComponent', () => {
  let component: FoodcardComponent;
  let fixture: ComponentFixture<FoodcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodcardComponent]
    });
    fixture = TestBed.createComponent(FoodcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
