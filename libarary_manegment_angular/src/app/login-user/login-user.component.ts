import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { User } from '../../user';

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

  constructor(private userService: UserServiceService, private router: Router) { }

  // login() {
  //   this.userService.userLogin(this.uname, this.pass).subscribe(
  //     response => {
  //       this.message = response.message;
  //       if (response.success) {
  //         this.router.navigate(['/viewproduct']);
  //       }
  //       else {

  //         this.router.navigate(['/login']);
  //       }

  //       this.uname = '';
  //       this.pass = '';

  //     },
  //     error => {
  //       this.message = "Login Failed. Please try again.";
  //       this.router.navigate(['/login']);
  //     }
  //   )
  // }

  // login() {
  //   if (!this.uname || !this.pass) {
  //     this.message = "Username and Password are required!";
  //     return; // ✅ Prevent empty login attempts
  //   }

  //   this.userService.userLogin(this.uname, this.pass).subscribe({
  //     next: (response) => {
  //       if (response.success) {
  //         this.router.navigate(['/viewproduct'], { queryParams: { userId: response.userId } });
  //       } else {
  //         this.message = response.message;
  //         this.router.navigate(['/login']);
  //       }
  //     },
  //     error: (error) => {
  //       this.message = "Login Failed. Please try again.";
  //       console.error("Login error:", error);
  //       this.router.navigate(['/login']);
  //     }
  //   });
  // }

  login(): void {
    this.userService.userLogin(this.uname, this.pass).subscribe({
      next: (response) => {
        if (response.success && response.userId) {
          this.router.navigate(['/viewproduct'], { queryParams: { userId: response.userId } });
        } else {
          console.error("Login failed. Redirecting to login.");
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        console.error("Login error. Redirecting to login.");
        this.router.navigate(['/login']);
      }
    });
  }




}