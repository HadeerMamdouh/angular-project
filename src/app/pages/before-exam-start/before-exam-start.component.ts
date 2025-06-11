import { ExamService } from './../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../models/exam';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ExamStartComponent } from "../exam-start/exam-start.component";

@Component({
  selector: 'app-before-exam-start',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './before-exam-start.component.html',
  styleUrl: './before-exam-start.component.css'
})
export class BeforeExamStartComponent implements OnInit{
  
  constructor(private route:ActivatedRoute,private router:Router ,private examService : ExamService, private userAccountService:UserAccountService){}
  
  examId:number = 0;

  exam!:Exam;


  ngOnInit(){
    this.examId = Number(this.route.snapshot.paramMap.get("examId"));

    this.examService.getExamById(this.examId).subscribe({
      next: (response) => {
        this.exam = Exam.fromJson(response);
      },
      error: (error) => {
        console.log(`Error: ${error}`);
      }
    });
  }


  startExam(){
    this.router.navigate(['/examStart', this.examId]);
  }


}
