import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFormatComponent } from './team-format.component';

describe('TeamFormatComponent', () => {
  let component: TeamFormatComponent;
  let fixture: ComponentFixture<TeamFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamFormatComponent]
    });
    fixture = TestBed.createComponent(TeamFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
