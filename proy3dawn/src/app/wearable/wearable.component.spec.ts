import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WearableComponent } from './wearable.component';

describe('WearableComponent', () => {
  let component: WearableComponent;
  let fixture: ComponentFixture<WearableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WearableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WearableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
