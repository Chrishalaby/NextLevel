import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBundleComponent } from './add-bundle.component';

describe('AddBundleComponent', () => {
  let component: AddBundleComponent;
  let fixture: ComponentFixture<AddBundleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBundleComponent]
    });
    fixture = TestBed.createComponent(AddBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
