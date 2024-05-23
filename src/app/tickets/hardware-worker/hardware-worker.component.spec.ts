import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareWorkerComponent } from './hardware-worker.component';

describe('HardwareWorkerComponent', () => {
  let component: HardwareWorkerComponent;
  let fixture: ComponentFixture<HardwareWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HardwareWorkerComponent]
    });
    fixture = TestBed.createComponent(HardwareWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
