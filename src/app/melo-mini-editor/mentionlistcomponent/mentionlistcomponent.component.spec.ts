import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionlistcomponentComponent } from './mentionlistcomponent.component';

describe('MentionlistcomponentComponent', () => {
  let component: MentionlistcomponentComponent;
  let fixture: ComponentFixture<MentionlistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentionlistcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionlistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
