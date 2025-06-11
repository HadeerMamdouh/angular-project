import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserExamResult } from '../../../models/userExamResult';
import { UserAccountService } from './../../../services/user-account.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Exam } from '../../../models/exam';
import { UserResultCardComponent } from "../../../components/user-result-card/user-result-card.component";
import { AvailableExamCardComponent } from "../../../components/available-exam-card/available-exam-card.component";

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, UserResultCardComponent, AvailableExamCardComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  
  constructor(private userAccountService:UserAccountService, private router:Router, private route:ActivatedRoute){}

  takenExamsResult:UserExamResult[] = [];
  availableExams: Exam[] = [];

  ngOnInit(): void {
      this.userAccountService.getAllExamResults().subscribe({
        next: (response) => {
          // console.log(response);
          this.takenExamsResult = response.map((result) => UserExamResult.fromJson(result));
          // console.log(this.takenExamsResult);
          this.takenExamsResult.reverse();
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });


      this.userAccountService.getAllAvailableExams().subscribe({
        next: (response) => {
          this.availableExams = response;
          // console.log(this.availableExams);
          this.availableExams.reverse();
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });
  }


  goEnterExam(examId:number){
    this.router.navigate(['/EnterExam', examId]);
  }

  goExamResult(examId:number){
    this.router.navigate(['/userExamResult', examId]);
  }


  goTakeExams(){
    this.router.navigate(['/taken-exams']);
  }

  goAvailableExams(){
    this.router.navigate(['/available-exams']);
  }
  
}
