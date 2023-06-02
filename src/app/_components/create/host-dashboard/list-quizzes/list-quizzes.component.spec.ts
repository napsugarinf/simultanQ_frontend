import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizzesComponent } from './list-quizzes.component';

describe('ListQuizzesComponent', () => {
  let component: ListQuizzesComponent;
  let fixture: ComponentFixture<ListQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListQuizzesComponent]
    });
    fixture = TestBed.createComponent(ListQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
