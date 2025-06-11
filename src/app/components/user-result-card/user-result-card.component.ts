import { Component, Input } from '@angular/core';
import { Exam } from '../../models/exam';
import { UserExamResult } from '../../models/userExamResult';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-result-card',
  imports: [DatePipe],
  templateUrl: './user-result-card.component.html',
  styleUrl: './user-result-card.component.css'
})
export class UserResultCardComponent {

  constructor(private router:Router){}

  @Input() result!:UserExamResult;

  goExamResult(examId:number){
    this.router.navigate(['/userExamResult', examId]);
  }
}
