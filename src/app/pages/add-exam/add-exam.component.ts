import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MyFormFieldComponent } from "../../components/my-form-field/my-form-field.component";
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyMainButtonComponent } from "../../components/my-main-button/my-main-button.component";
import { AddQuestionCardComponent } from '../../components/add-question-card/add-question-card.component';
import { Exam } from '../../models/exam';
import { ExamService } from '../../services/exam.service';
import { Question } from '../../models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exam',
  imports: [MyFormFieldComponent, FormsModule, ReactiveFormsModule, MyMainButtonComponent, AddQuestionCardComponent, NavbarComponent],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent {

  constructor(private examService: ExamService, private router: Router){}

  addExamFormGroup = new FormGroup({
    examName: new FormControl(''),
    examDuration: new FormControl('', [Validators.pattern('[0-9]*'), Validators.min(1)]),
  });

  get getExamNameController() : FormControl{
    return this.addExamFormGroup.controls['examName'];
  }

  get getExamDurationController() : FormControl{
    return this.addExamFormGroup.controls['examDuration'];
  }

  examQuestionsFormGroup: FormGroup[] = [];

  submitErrorMessage:string = "";


  addingNewQuestion(){
    this.examQuestionsFormGroup.push(new FormGroup({
      body: new FormControl('', [Validators.required]),
      points: new FormControl('1', [Validators.min(1), Validators.max(100)]),
      questionType: new FormControl('0'),
      choices: new FormArray([
        this.createChoice('', false),
        this.createChoice('', false),
      ])
    }));
  }

  private createChoice(text: string, isCorrect: boolean): FormGroup {
  return new FormGroup({
    text: new FormControl(text, Validators.required),
    isCorrect: new FormControl(isCorrect)
  });
  }

  deletingQuestion(index:number){
    this.examQuestionsFormGroup.splice(index, 1);
  }

  onSubmitExam() {
  if (!this.validateExamData()) {
    this.submitErrorMessage = "Please make sure of the exam & questions data";
    return;
  }
  this.submitErrorMessage = "";

  const newExamQuestions = this.examQuestionsFormGroup.map((group) => {
    const choicesRaw = group.controls['choices'].value as Array<any>;

    // Build choices array
    const choices = choicesRaw.map(choice => ({
      text: choice.text,
      isCorrect: choice.isCorrect
    }));

    return {
      body: group.controls['body'].value,
      questionType: Number(group.controls['questionType'].value),
      points: Number(group.controls['points'].value),
      choices: choices
    };
  });

  const newExam = {
    name: this.addExamFormGroup.controls['examName'].value!,
    durationInMinutes: Number(this.addExamFormGroup.controls['examDuration'].value),
    questions: newExamQuestions
  };

  // console.log(newExam);

  this.examService.addExam(newExam).subscribe({
    next: (response) => {
      alert('✅ Exam created successfully');
      // console.log('Exam submitted successfully:', response);
      this.submitErrorMessage = '';
      this.router.navigate(['/home']);
    },
    error: (error) => {
      console.error('Failed to submit exam:', error);
      this.submitErrorMessage = 'Failed to submit exam. Please try again.';
    }
  });

  
}


  validateExamData() : boolean{
    let state = true;

    state = (state && this.addExamFormGroup.controls['examName'].value != ''); // check if the exam's name is not empty
    const durationValue = Number(this.addExamFormGroup.controls['examDuration'].value);
    state = state && Number.isInteger(durationValue) && durationValue > 0; // Check if the duration is a number

    this.examQuestionsFormGroup.forEach((group) => {
      state = state && (group.controls['body'].value !== ''); // Check if the question's body is not empty

      let choices = (group.controls['choices'].value) as Array<object>;
      let correctCount = 0;
      // console.log(choices);
      choices.forEach((choice) => {
        const obj = choice as {text: string, isCorrect:boolean};
        state = state && obj.text != ''; // Check if the choice's text is not empty
        correctCount += (obj.isCorrect == true ? 1 : 0);
      });

      state = state && correctCount > 0; // Check if there is at least 1 correct choice
    });

    return state;
  }
}
