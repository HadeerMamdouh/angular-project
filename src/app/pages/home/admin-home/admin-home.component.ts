import { Exam } from '../../../models/exam';
import { Component, OnInit } from '@angular/core';
import { ExamCardComponent } from "../../../components/exam-card/exam-card.component";
import { ExamService } from '../../../services/exam.service';
import { Router } from '@angular/router';
import { SearchBarComponent } from "../../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-admin-home',
  imports: [ExamCardComponent, SearchBarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {

  constructor(private examService: ExamService, private router:Router){}

  examsList:Exam[] = [];
  filteredExamList:Exam[] = [];

  async ngOnInit() {
      // Call an API and to get all the Exam & Fetch the Data
      await this.getAllExams();
  }

  async getAllExams() : Promise<void> {
    this.examsList = [];
    this.examService.getAllExams().subscribe({
      next: (response) => {

        // console.log(JSON.stringify(response, null, 2));

        response.forEach((exam) => {
          // console.log(exam);
          this.examsList.push(Exam.fromJson(exam));
        });

        // console.log(this.examsList);
        this.examsList.reverse();
        this.filteredExamList = this.examsList;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  goToAddExam(){
    this.router.navigate(['/addExam']);
  }

  filterExams(filter: string) {
    const term = filter.toLowerCase().trim();

    this.filteredExamList = this.examsList.filter(exam =>
      exam.name.toLowerCase().includes(term)
    );
  }
}
