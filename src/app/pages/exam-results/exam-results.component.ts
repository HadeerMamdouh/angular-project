import { ExamService } from './../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UserExamResult } from '../../models/userExamResult';
import { Exam } from '../../models/exam';
import { UserExamResultCardComponent } from "../../components/user-exam-result-card/user-exam-result-card.component";
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-exam-results',
  imports: [UserExamResultCardComponent, NavbarComponent, CommonModule, SearchBarComponent],
  templateUrl: './exam-results.component.html',
  styleUrl: './exam-results.component.css'
})
export class ExamResultsComponent implements OnInit {
  constructor(private route:ActivatedRoute, private examService:ExamService){}

  examResults:UserExamResult[] = [];
  examQuestions: Question[] = [];
  filteredResults: UserExamResult[] = [];


  ngOnInit(): void {
      let examId = Number(this.route.snapshot.paramMap.get("examId"));

      this.examService.getExamResults(examId).subscribe({
        next: (response) => {
          this.examResults = response.map((res) => UserExamResult.fromJson(res));
          // console.log(this.examResults);
          this.filteredResults = this.examResults;

          this.filteredResults.reverse();
        },
        error: (error) => {
          console.log(`Error : ${error}`);
        }
      });

      this.examService.getExamQuestions(examId).subscribe({
        next: (response) => {
          this.examQuestions = response.map((question) => Question.fromJson(question));
          // console.log(this.examQuestions);
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });
  }


  filterResults(searchTerm: string) {
    const term = searchTerm.toLowerCase().trim();

    this.filteredResults = this.examResults.filter(result =>
      result.userName.toLowerCase().includes(term)
    );
  }
}
