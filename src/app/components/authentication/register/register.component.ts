import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.formSkeleton()
  }
  onSubmitUserDetails(formValue){
    console.warn(formValue);
    
  }
  formSkeleton() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.required
      ])),
      'lastName': new FormControl('', Validators.compose([
        Validators.maxLength(25)
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'),
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
      ])),
      'gender': new FormControl('', Validators.compose([
        Validators.required,
      ])),
    })
  }

}
