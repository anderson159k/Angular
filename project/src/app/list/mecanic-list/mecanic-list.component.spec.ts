import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicListComponent } from './mecanic-list.component';

describe('MecanicListComponent', () => {
  let component: MecanicListComponent;
  let fixture: ComponentFixture<MecanicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MecanicListComponent]
    });
    fixture = TestBed.createComponent(MecanicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
