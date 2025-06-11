import { Choice, QuestionType } from './../../models/question';
import { ExamService } from './../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../../models/exam';
import { Question } from '../../models/question';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-exam-details',
  imports: [MatIconModule, MatCheckboxModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle, NavbarComponent, CommonModule],
  templateUrl: './admin-exam-details.component.html',
  styleUrl: './admin-exam-details.component.css'
})
export class AdminExamDetailsComponent implements OnInit{

  constructor(private route:ActivatedRoute, private examService : ExamService, private router : Router){}

  currentExam! : Exam;
  examQuestions: Question[] = [];
  QuestionType = QuestionType;
  hasResults:boolean = false;
  
  ngOnInit(): void {
    this.examQuestions = [];
      let examId = Number(this.route.snapshot.paramMap.get('examId'));

      // console.log(`Exam ID: ${examId}`);

      this.examService.getExamById(examId).subscribe({
        next: (response) => {
          // console.log(response);
          this.currentExam = Exam.fromJson(response);

          // console.log(this.currentExam);

          this.examService.getExamQuestions(examId).subscribe({
            next: (response) => {
              // console.log(`Exam Questions: ${response}`);
              response.forEach(element => {
                this.examQuestions.push(Question.fromJson(element));
              });

              // console.log(this.examQuestions);
              this.currentExam.questions = this.examQuestions;
            },

            error: (error) => {
              console.log(error);
            }

          });
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.examService.getExamHasResults(examId).subscribe({
        next: (response) => {
          this.hasResults = response['hasResults'];
        },
        error: (error) => {
          console.log(`Error : ${error}`);
        }
      });
  }


  getQuestionTypeName(type: QuestionType): string {
    return QuestionType[type];
  }

  getCorrectTF(choices: Choice[]): boolean {
    return choices.find(c => c.isCorrect)?.choiceText === 'true';
  }

  goBack(){
    this.router.navigate(['/home'])
  }

  goEdit(){
    this.router.navigate(['/editExam', this.currentExam.id]);
  }

  goToResults(){
    this.router.navigate(['/examResults', this.currentExam.id]);
  }

  async deleteExam() {
  
  if (confirm('Are you sure you want to delete this exam?')) {
    this.examService.deleteExam(this.currentExam.id).subscribe({
      next: (response) => {
        // console.log(`Response: ${JSON.stringify(response)}`);
      },
      error: (error) => {
        console.log(`Error: ${JSON.stringify(error)}`);
      }
    });
  }
  this.router.navigate(['/home']);
}

}
