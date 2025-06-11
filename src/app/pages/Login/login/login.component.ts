import { routes } from './../../../app.routes';
import { Component, EventEmitter, Output } from '@angular/core';
import { MyFormFieldComponent } from "../../../components/my-form-field/my-form-field.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyMainButtonComponent } from "../../../components/my-main-button/my-main-button.component";
import { MyTextButtonComponent } from "../../../components/my-text-button/my-text-button.component";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { myValidations } from '../../../shared/validations';

@Component({
  selector: 'app-login',
  imports: [MyFormFieldComponent, ReactiveFormsModule, MyMainButtonComponent, MyTextButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private authServices: AuthenticationService, private userService: UserService){}

  loginFormGroup = new FormGroup({
    username: new FormControl('', myValidations.UsernameValidations),
    password: new FormControl('', myValidations.PasswordValidations),
  });
  ErrorMessage!:string;

  usernameErrorMessage:string = "";
  passwordErrorMessage:string = "";


  @Output() onLoggedInEvent = new EventEmitter();

  get getUsernameController():FormControl{
    return this.loginFormGroup.controls['username'];
  }
  get getPasswordController():FormControl{
    return this.loginFormGroup.controls['password'];
  }


  logIn(){
    var usernameValue = this.loginFormGroup.get("username")!.value;
    var passwordValue = this.loginFormGroup.get("password")!.value;
    // console.log(usernameValue);
    // console.log(passwordValue);

    // this.router.navigate(['/home']);
    this.authServices.login({userName: usernameValue!, password: passwordValue!}).subscribe({
      next: (response) => {
        var token = response['token'];
        localStorage.setItem('authToken', token);
        // console.log(`Response: ${response['token']}`);

        this.onLoggedInEvent.emit();
        
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.log(e);
        this.ErrorMessage = e['error']['errors'][0];
        this.usernameErrorMessage = e['error']['errors']['UserName'];
        this.passwordErrorMessage = e['error']['errors']['Password'];
        // console.log(this.ErrorMessage);
        // console.log(`Error: ${e['status']}`);
      },
    });
  }
}
