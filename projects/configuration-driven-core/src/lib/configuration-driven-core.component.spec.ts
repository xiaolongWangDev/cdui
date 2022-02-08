import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationDrivenCoreComponent } from './configuration-driven-core.component';

describe('ConfigurationDrivenCoreComponent', () => {
  let component: ConfigurationDrivenCoreComponent;
  let fixture: ComponentFixture<ConfigurationDrivenCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationDrivenCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationDrivenCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
