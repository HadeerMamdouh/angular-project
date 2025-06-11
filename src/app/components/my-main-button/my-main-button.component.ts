import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-main-button',
  imports: [],
  templateUrl: './my-main-button.component.html',
  styleUrl: './my-main-button.component.css'
})
export class MyMainButtonComponent {
  @Input() lable:string = "";
  @Input() action!: VoidFunction;
}
