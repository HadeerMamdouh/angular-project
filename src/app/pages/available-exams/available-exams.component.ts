import { UserAccountService } from './../../services/user-account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Exam } from '../../models/exam';
import { AvailableExamCardComponent } from "../../components/available-exam-card/available-exam-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-available-exams',
  imports: [NavbarComponent, AvailableExamCardComponent, CommonModule, ReactiveFormsModule, SearchBarComponent, FormsModule],
  templateUrl: './available-exams.component.html',
  styleUrl: './available-exams.component.css'
})
export class AvailableExamsComponent implements OnInit {

  constructor(private userAccountService:UserAccountService){}

  availableExams: Exam[] = [];
  filteredAvailableExams:Exam[] = [];

  ngOnInit(): void {
      this.userAccountService.getAllAvailableExams().subscribe({
        next: (response) => {
          this.availableExams = response;
          // console.log(this.availableExams);
          this.availableExams.reverse();
          this.filteredAvailableExams = this.availableExams;
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });
  }

  filterExams(filter:string){
    const term = filter.toLowerCase().trim();

    this.filteredAvailableExams = this.availableExams.filter(exam =>
      exam.name.toLowerCase().includes(term)
    );
  }

}
