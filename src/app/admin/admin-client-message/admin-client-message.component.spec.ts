import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientMessageComponent } from './admin-client-message.component';

describe('AdminClientMessageComponent', () => {
  let component: AdminClientMessageComponent;
  let fixture: ComponentFixture<AdminClientMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
