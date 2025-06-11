import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../../models/exam';
import { ExamService } from '../../services/exam.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MyFormFieldComponent } from "../../components/my-form-field/my-form-field.component";
import { AddQuestionCardComponent } from "../../components/add-question-card/add-question-card.component";
import { MyMainButtonComponent } from "../../components/my-main-button/my-main-button.component";
import { Question } from '../../models/question';


@Component({
  selector: 'app-edit-exam',
  imports: [ReactiveFormsModule, CommonModule, MyFormFieldComponent, AddQuestionCardComponent, MyMainButtonComponent, NavbarComponent],
  templateUrl: './edit-exam.component.html',
  styleUrl: './edit-exam.component.css'
})
export class EditExamComponent implements OnInit {

  constructor(private route:ActivatedRoute, private examService: ExamService, private router:Router){}

  examId:number = 0;
  currentExam!: Exam;


  editExamFormGroup = new FormGroup({
    examName: new FormControl(''),
    examDuration: new FormControl('', [Validators.pattern('[0-9]*'), Validators.min(1)]),
  });

  get getExamNameController() : FormControl{
    return this.editExamFormGroup.controls['examName'];
  }

  get getExamDurationController() : FormControl{
    return this.editExamFormGroup.controls['examDuration'];
  }

  examQuestionsFormGroup: FormGroup[] = [];

  submitErrorMessage:string = "";

  ngOnInit() {
  this.examId = Number(this.route.snapshot.paramMap.get("examId"));

  this.examService.getExamById(this.examId).subscribe({
    next: (response) => {
      this.currentExam = Exam.fromJson(response);

      // console.log("Setting the Exam Data to the controllers");
      this.editExamFormGroup.controls['examName'].setValue(this.currentExam.name);
      this.editExamFormGroup.controls['examDuration'].setValue(String(this.currentExam.durationInMinutes));


      this.examService.getExamQuestions(this.examId).subscribe({
        next: (response) => {
          
          response.forEach(element => {
            this.currentExam.questions.push(Question.fromJson(element));
          });

          console.log(this.currentExam.questions);

          console.log("Setting the exam's questions to the controllers");
          this.currentExam.questions.map((question) => {
            this.addingNewQuestion(question);
          });

          console.log(this.examQuestionsFormGroup.length);



        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });

    },
    error: (error) => {
      console.log(`Error: ${error}`);
    }
  });
}


  addingNewQuestion(question: Question | null) {
  const questionText = question?.questionText ?? '';
  const points = question?.points ?? 1;
  const questionType = question?.questionType ?? '0';

  let choicesArray: FormArray;

  if (question?.choices && question.choices.length > 0) {
    choicesArray = new FormArray(
      question.choices.map(choice =>
        this.createChoice(choice.choiceText ?? '', choice.isCorrect ?? false)
      )
    );
  } else {
    choicesArray = new FormArray([
      this.createChoice('', false),
      this.createChoice('', false),
    ]);
  }

  this.examQuestionsFormGroup.push(new FormGroup({
    body: new FormControl(questionText, [Validators.required]),
    points: new FormControl(points, [Validators.min(1), Validators.max(100)]),
    questionType: new FormControl(questionType),
    choices: choicesArray
  }));
}


  private createChoice(text: string, isCorrect: boolean): FormGroup {
    return new FormGroup({
      text: new FormControl(text, [Validators.required]),
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

    let newExam = {
      name: this.editExamFormGroup.controls['examName'].value!,
      durationInMinutes: Number(this.editExamFormGroup.controls['examDuration'].value),
      questions: newExamQuestions
    };

    // console.log(newExam.questions);

    this.examService.updateExam(this.examId, newExam).subscribe({
      next: (response) => {
        alert('✅ Exam updated successfully');
        // console.log('Exam updated successfully:', response);
        this.submitErrorMessage = '';
        this.router.navigate(['/examDetails', this.examId]);
      },
      error: (error) => {
        console.error('Failed to submit exam:', error);
        this.submitErrorMessage = 'Failed to submit exam. Please try again.';
      }
    });

  
  }


  validateExamData() : boolean{
    let state = true;

    state = (state && this.editExamFormGroup.controls['examName'].value != ''); // check if the exam's name is not empty
    const durationValue = Number(this.editExamFormGroup.controls['examDuration'].value);
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