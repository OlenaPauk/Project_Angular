import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubCardsComponent } from './club-cards.component';

describe('ClubCardsComponent', () => {
  let component: ClubCardsComponent;
  let fixture: ComponentFixture<ClubCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
