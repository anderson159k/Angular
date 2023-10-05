import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicTimerComponent } from './mecanic-timer.component';

describe('MecanicTimerComponent', () => {
  let component: MecanicTimerComponent;
  let fixture: ComponentFixture<MecanicTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MecanicTimerComponent]
    });
    fixture = TestBed.createComponent(MecanicTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
