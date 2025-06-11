import { Component } from '@angular/core';
import { MyFormFieldComponent } from '../../../components/my-form-field/my-form-field.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyMainButtonComponent } from '../../../components/my-main-button/my-main-button.component';
import { MyTextButtonComponent } from '../../../components/my-text-button/my-text-button.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MyFormFieldComponent, ReactiveFormsModule, MyMainButtonComponent, MyTextButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService:AuthenticationService, private router: Router){}


  registerFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  usernameErrorMessage:string = "";
  emailErrorMessage:string = "";
  passwordErrorMessage:string = "";


  ErrorMessage!:string;

  

  get getUsernameController():FormControl{
    return this.registerFormGroup.get("username") as FormControl;
  }
  get getEmailController():FormControl{
    return this.registerFormGroup.get("email") as FormControl;
  }
  get getPasswordController():FormControl{
    return this.registerFormGroup.get("password") as FormControl;
  }

  register(){
    var usernameValue = this.registerFormGroup.get("username")!.value;
    var emailValue = this.registerFormGroup.get("email")!.value;
    var passwordValue = this.registerFormGroup.get("password")!.value;


    // console.log(usernameValue);
    // console.log(emailValue);
    // console.log(passwordValue);



    this.authService.register({userName: usernameValue!, email: emailValue!, password: passwordValue!}).subscribe({
      next: (response) => {
        alert("✅ Email Created Successfully");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
        this.ErrorMessage = error['error']['errors'][0];
        this.usernameErrorMessage = error['error']['errors']['UserName'];
        this.emailErrorMessage = error['error']['errors']['Email'];
        this.passwordErrorMessage = error['error']['errors']['Password'];
      }
    });

  }
}
