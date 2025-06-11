import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question-card',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-question-card.component.html',
  styleUrls: ['./add-question-card.component.css']
})
export class AddQuestionCardComponent implements OnInit {
  @Input() questionFormGroup!: FormGroup;
  @Input() groupIndex!: number;
  @Output() onDeletingQuestionEvent = new EventEmitter<number>();
  @Input() mode:string = "new";

  hasChoiceError = false;
  lastCorrectIndex: number | null = null;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  if(this.mode == "new"){
      this.initializeChoices();
      this.questionFormGroup.get('questionType')?.valueChanges.subscribe(() => {
      this.initializeChoices();
    });

    this.questionFormGroup.get('choices')?.valueChanges.subscribe(() => {
      this.checkChoiceValidity();
    });
  }
  
}


  get choicesArray(): FormArray {
    return this.questionFormGroup.get('choices') as FormArray;
  }

  getChoiceTextControl(index: number): FormControl {
    return (this.choicesArray.at(index) as FormGroup).controls['text'] as FormControl;
  }

  initializeChoices() {
    const questionType = this.questionFormGroup.get('questionType')?.value;
    this.choicesArray.clear();

    if (questionType === '1') { // True/False
      this.choicesArray.push(this.createChoice('True', false));
      this.choicesArray.push(this.createChoice('False', false));
    } else { // MCQ
      this.choicesArray.push(this.createChoice('', false));
      this.choicesArray.push(this.createChoice('', false));
    }
    this.checkChoiceValidity();
  }

  createChoice(text: string, isCorrect: boolean): FormGroup {
    return this.fb.group({
      text: [text, Validators.required],
      isCorrect: [isCorrect]
    });
  }

  // Add this to your component class
addChoice() {
  if (this.choicesArray.length < 4) {
    this.choicesArray.push(this.createChoice('', false));
    this.checkChoiceValidity();
  }
}


removeChoice(index: number) {
  if (this.choicesArray.length > 2) {
    const wasCorrect = this.choicesArray.at(index).get('isCorrect')?.value;
    this.choicesArray.removeAt(index);

    // If no correct answers left, mark the first as correct
    if (wasCorrect && this.getCorrectAnswersCount() === 0) {
      this.choicesArray.at(0)?.get('isCorrect')?.setValue(true);
    }

    this.checkChoiceValidity();
  }
}


onCorrectAnswerChange(index: number) {
  const questionType = this.questionFormGroup.get('questionType')?.value;

  if (questionType === '1') {
    // True/False: allow only one correct answer
    this.choicesArray.controls.forEach((choice, i) => {
      choice.get('isCorrect')?.setValue(i === index);
    });
  }

  // For both MCQ and TF, always validate after change
  this.checkChoiceValidity();
}

private getCorrectAnswersCount(): number {
  return this.choicesArray.controls.filter(c => c.get('isCorrect')?.value).length;
}

checkChoiceValidity() {
  const hasCorrectAnswer = this.getCorrectAnswersCount() > 0;
  this.hasChoiceError = !hasCorrectAnswer;
  
  // Update the error state immediately
  if (hasCorrectAnswer) {
    this.questionFormGroup.setErrors(null);
  } else {
    this.questionFormGroup.setErrors({ noCorrectAnswer: true });
  }
  
  // Force change detection
  this.cdr.detectChanges();
}

  getChoicePlaceholder(index: number): string {
    if (this.questionFormGroup.get('questionType')?.value === '1') {
      return index === 0 ? 'True' : 'False';
    }
    return `Option ${index + 1}`;
  }

  onDeleting(index: number) {
    this.onDeletingQuestionEvent.emit(index);
  }
}