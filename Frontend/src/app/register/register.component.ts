import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../CustomValidators/ConfirmPassword';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 
  constructor(private FB: FormBuilder){}

  RegisterForm : FormGroup =  this.FB.group({
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
      ]),
      address: new FormControl('', [Validators.required, Validators.maxLength(15)]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)        
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    }, passwordMatchValidator);
    
    onSubmit() {
    if (this.RegisterForm.valid) {
      console.log('Form submitted:', this.RegisterForm);
    } else {
      console.log('Form is invalid', this.RegisterForm);
    }
  }

}
