import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareWorkerComponent } from './software-worker.component';

describe('SoftwareWorkerComponent', () => {
  let component: SoftwareWorkerComponent;
  let fixture: ComponentFixture<SoftwareWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareWorkerComponent]
    });
    fixture = TestBed.createComponent(SoftwareWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
