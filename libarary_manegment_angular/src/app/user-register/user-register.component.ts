import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../../user';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  registerForm: FormGroup;

  constructor(private userService: UserServiceService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      uname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,10}$/)]],
      email: ['', [Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)]],
      pass: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required]
    })
  }


  users: User[] = [];
  newUser: User = { uname: '', email: '', pass: '', gender: '', phone: '' }

  addUser() {

    this.userService.addUser(this.newUser).subscribe({
      next: (data) => {
        console.log("User data is : ", data);
        console.log("Regiter Form Value : ", this.registerForm.value);
        alert('Registration Successful');
        this.newUser = { uname: '', email: '', pass: '', gender: '', phone: '' }

      }, error: (error) => {
        console.log("Error is : ", error);
      }
    }

    )
  }

}
