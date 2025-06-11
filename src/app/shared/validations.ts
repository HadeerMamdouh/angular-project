import { Validators } from "@angular/forms";

export class myValidations{
    static EmailValidations: Validators = [Validators.required, Validators.email];
    static UsernameValidations: Validators = [Validators.required, Validators.minLength(3)];
    static PasswordValidations: Validators = [Validators.required]
}