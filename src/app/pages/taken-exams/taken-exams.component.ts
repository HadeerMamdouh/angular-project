import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { UserExamResult } from '../../models/userExamResult';
import { UserAccountService } from '../../services/user-account.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserResultCardComponent } from "../../components/user-result-card/user-result-card.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-taken-exams',
  imports: [NavbarComponent, CommonModule, UserResultCardComponent, SearchBarComponent],
  templateUrl: './taken-exams.component.html',
  styleUrl: './taken-exams.component.css'
})
export class TakenExamsComponent implements OnInit{

  constructor(private userAccountService: UserAccountService){}

  takenExamsResult:UserExamResult[] = [];
  filteredExamResults:UserExamResult[] = [];

  ngOnInit(): void{
    this.userAccountService.getAllExamResults().subscribe({
        next: (response) => {
          // console.log(response);
          this.takenExamsResult = response.map((result) => UserExamResult.fromJson(result));
          // console.log(this.takenExamsResult);
          this.takenExamsResult.reverse();
          this.filteredExamResults = this.takenExamsResult;
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });    
  }

  filterResults(filter:string){
    const term = filter.toLowerCase().trim();

    this.filteredExamResults = this.takenExamsResult.filter(result =>
      result.exam.name.toLowerCase().includes(term)
    );
  }
}
