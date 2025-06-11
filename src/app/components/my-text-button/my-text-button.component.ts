import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-text-button',
  imports: [],
  templateUrl: './my-text-button.component.html',
  styleUrl: './my-text-button.component.css'
})
export class MyTextButtonComponent {
  @Input() label:string = "";
  @Input() path!:string;
}
