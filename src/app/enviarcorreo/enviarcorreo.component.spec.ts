import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarcorreoComponent } from './enviarcorreo.component';

describe('EnviarcorreoComponent', () => {
  let component: EnviarcorreoComponent;
  let fixture: ComponentFixture<EnviarcorreoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarcorreoComponent]
    });
    fixture = TestBed.createComponent(EnviarcorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});