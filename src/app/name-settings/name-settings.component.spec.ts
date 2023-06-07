import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSettingsComponent } from './name-settings.component';

describe('NameSettingsComponent', () => {
  let component: NameSettingsComponent;
  let fixture: ComponentFixture<NameSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
