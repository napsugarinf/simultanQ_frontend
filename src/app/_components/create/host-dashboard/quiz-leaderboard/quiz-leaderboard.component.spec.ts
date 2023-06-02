import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLeaderboardComponent } from './quiz-leaderboard.component';

describe('QuizLeaderboardComponent', () => {
  let component: QuizLeaderboardComponent;
  let fixture: ComponentFixture<QuizLeaderboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizLeaderboardComponent]
    });
    fixture = TestBed.createComponent(QuizLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
