import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {

  uname: string = '';
  pass: string = '';
  message: string = '';

  constructor(private userService: UserServiceService,private router: Router) { }

  login() {
    this.userService.userLogin(this.uname, this.pass).subscribe(response => {
      this.message = response.message;
      this.uname = '';
      this.pass = '';
      this.router.navigate(['/library'])

    },
      error => {
        this.message = "Login Faild";
      }
    )
  }



}
