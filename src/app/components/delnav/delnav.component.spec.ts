import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelnavComponent } from './delnav.component';

describe('DelnavComponent', () => {
  let component: DelnavComponent;
  let fixture: ComponentFixture<DelnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelnavComponent]
    });
    fixture = TestBed.createComponent(DelnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
