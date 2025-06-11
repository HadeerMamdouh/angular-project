import { Component, Input } from '@angular/core';
import { UserExamResult } from '../../models/userExamResult';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Question } from '../../models/question';
import { UserAnswer } from '../../models/userAnswer';

@Component({
  selector: 'app-user-exam-result-card',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-exam-result-card.component.html',
  styleUrl: './user-exam-result-card.component.css'
})
export class UserExamResultCardComponent {
  @Input() result!: UserExamResult;
  @Input() examQuestions: Question[] = [];

  getUserAnswer(questionId: number): UserAnswer | undefined {
    return this.result.userAnswers.find(ans => ans.questionId === questionId);
  }

  getQuestion(questionId: number): Question | undefined {
    return this.examQuestions.find(q => q.id === questionId);
  }

  getChoiceText(questionId: number, choiceId?: number): string | null {
    const question = this.getQuestion(questionId);
    return question?.choices.find(c => c.id === choiceId)?.choiceText ?? null;
  }

  getCorrectChoiceText(questionId: number): string {
    const question = this.getQuestion(questionId);
    const correct = question?.choices.find(c => c.isCorrect);
    return correct ? correct.choiceText : 'Not defined';
  }


}
