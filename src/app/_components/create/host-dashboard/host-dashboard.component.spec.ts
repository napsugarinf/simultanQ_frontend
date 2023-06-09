import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostDashboardComponent } from './host-dashboard.component';

describe('HostDashboardComponent', () => {
  let component: HostDashboardComponent;
  let fixture: ComponentFixture<HostDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostDashboardComponent]
    });
    fixture = TestBed.createComponent(HostDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
