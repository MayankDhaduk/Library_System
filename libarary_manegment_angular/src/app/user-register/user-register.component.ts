import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../../user';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  constructor(private userService: UserServiceService) { }

  users: User[] = [];
  newUser: User = { uname: '', email: '', pass: '', gender: '', phone: '' }

  addUser() {
    this.userService.addUser(this.newUser).subscribe((data) => {
      console.log(data);
      this.newUser = { uname: '', email: '', pass: '', gender: '', phone: '' }
    }, (error) => {
      console.log(error);
    }
    )
  }

}
