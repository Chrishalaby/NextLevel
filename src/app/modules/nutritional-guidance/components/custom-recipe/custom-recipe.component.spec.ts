import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRecipeComponent } from './custom-recipe.component';

describe('CustomRecipeComponent', () => {
  let component: CustomRecipeComponent;
  let fixture: ComponentFixture<CustomRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomRecipeComponent]
    });
    fixture = TestBed.createComponent(CustomRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
