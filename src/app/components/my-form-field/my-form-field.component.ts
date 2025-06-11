import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-my-form-field',
  imports: [ReactiveFormsModule],
  templateUrl: './my-form-field.component.html',
  styleUrl: './my-form-field.component.css'
})
export class MyFormFieldComponent {
  @Input() myFieldController = new FormControl('');
  @Input() lable: string = "lable";
  @Input() type: string = "text";

  
}
