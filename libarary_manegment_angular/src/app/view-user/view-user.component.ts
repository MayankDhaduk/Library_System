import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../user';
import { UserServiceService } from '../user-service.service';
import { LibraryshowComponent } from "../libraryshow/libraryshow.component";
import { AdminComponent } from "../admin/admin.component";
import { UUID } from 'crypto';
import { error } from 'console';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [FormsModule, CommonModule, AdminComponent],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit {


  users: User[] = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.viewuser();
  }

  viewuser() {
    this.userService.userview().subscribe((data) => {
      console.log(data)
      this.users = data;
    })
  }

  deleteUser(id?: UUID) {
    if (id) {
      this.userService.userdelete(id).subscribe((data) => {
        console.log("Deleted Successfully");
        this.viewuser();
      },
        (error) => {
          console.log("Error is : ", error)
        }
      )
    }

  }
}
