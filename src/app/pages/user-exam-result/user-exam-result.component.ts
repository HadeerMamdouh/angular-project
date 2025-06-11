import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { UserExamResult } from '../../models/userExamResult';
import { Question } from '../../models/question';
import { ExamService } from '../../services/exam.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAnswer } from '../../models/userAnswer';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-user-exam-result',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './user-exam-result.component.html',
  styleUrl: './user-exam-result.component.css'
})
export class UserExamResultComponent implements OnInit{
  constructor(private route:ActivatedRoute, private router:Router, private userAccountService:UserAccountService, private examService:ExamService){}

  examId:number = 0;
  userExamResult!: UserExamResult;
  examQuestions: Question[] = [];

  ngOnInit(): void {
      this.examId = Number(this.route.snapshot.paramMap.get("examId"));
      this.userAccountService.getExamResult(this.examId).subscribe({
        next: (response) => {
          this.userExamResult = UserExamResult.fromJson(response);
          // console.log(this.userExamResult);
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.examService.getExamQuestions(this.examId).subscribe({
        next: (response) => {
          this.examQuestions = response.map((question) => Question.fromJson(question));
          // console.log(this.examQuestions);
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });
  }

  getUserAnswer(questionId: number){
    return this.userExamResult.userAnswers.find(ans => ans.questionId === questionId);
  }

  getQuestionById(questionId: number) {
    return this.examQuestions.find(q => q.id === questionId);
  }

  getChoicesByQuestionId(questionId: number) {
    const question = this.getQuestionById(questionId);
    return question ? question.choices : [];
  }

  getUserAnswerChoiceText(questionId: number): string | null {
  const userAnswer = this.userExamResult.userAnswers.find(ans => ans.questionId === questionId);
  if (!userAnswer) return null;

  const question = this.examQuestions.find(q => q.id === questionId);
  if (!question || !question.choices) return null;

  const choice = question.choices.find(c => c.id === userAnswer.selectedChoiceId);
  return choice ? choice.choiceText : null;
}

// Get correct answer(s) text for a question
getCorrectAnswerText(questionId: number): string {
  const question = this.examQuestions.find(q => q.id === questionId);
  if (!question || !question.choices) return 'No correct answer available';
  // Collect all correct choices (in case of multiple)
  const correctChoices = question.choices.filter(c => c.isCorrect);
  // Join text if multiple correct answers, otherwise just return one
  return correctChoices.map(c => c.choiceText).join(', ');
}

isAnswerIncorrect(question: Question): boolean {
  const userAnswer = this.getUserAnswer(question.id);
  if (!userAnswer) return false;
  
  const correctChoice = question.choices.find(c => c.isCorrect);
  return userAnswer.selectedChoiceId !== correctChoice?.id;
}


goBack(){
  this.router.navigate(['/home']);
}


}
