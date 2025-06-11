import { Component, Input } from '@angular/core';
import { Exam } from '../../models/exam';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-exam-card',
  imports: [CommonModule],
  templateUrl: './available-exam-card.component.html',
  styleUrl: './available-exam-card.component.css'
})
export class AvailableExamCardComponent {
  constructor(private router:Router){}
  @Input() exam!:Exam;

  goEnterExam(examId:number){
    this.router.navigate(['/EnterExam', examId]);
  }
}
