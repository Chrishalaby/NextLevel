import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCustomWorkoutComponent } from './ai-custom-workout.component';

describe('AiCustomWorkoutComponent', () => {
  let component: AiCustomWorkoutComponent;
  let fixture: ComponentFixture<AiCustomWorkoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiCustomWorkoutComponent]
    });
    fixture = TestBed.createComponent(AiCustomWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
