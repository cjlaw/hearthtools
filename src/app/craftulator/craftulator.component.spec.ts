import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftulatorComponent } from './craftulator.component';

describe('CraftulatorComponent', () => {
  let component: CraftulatorComponent;
  let fixture: ComponentFixture<CraftulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
