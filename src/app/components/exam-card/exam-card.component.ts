import { Component, Input } from '@angular/core';
import { Exam } from '../../models/exam';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-card',
  imports: [CommonModule],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.css'
})
export class ExamCardComponent {
  
  constructor(private router:Router){}

  @Input() exam!: Exam;

  showExamDetails(examId:number) : void{
    this.router.navigate(['/examDetails', examId]);
  }

}
