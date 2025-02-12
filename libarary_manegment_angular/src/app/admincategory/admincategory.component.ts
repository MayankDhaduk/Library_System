import { AdminComponent } from "../admin/admin.component";
import { AdminService } from '../admin.service';
import { AdminCategory } from '../../admin-category';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UUID } from "node:crypto";

@Component({
  selector: 'app-admincategory',
  standalone: true,
  imports: [AdminComponent, FormsModule, CommonModule],
  templateUrl: './admincategory.component.html',
  styleUrl: './admincategory.component.css'
})
export class AdmincategoryComponent implements OnInit {

  constructor(private categoryService: AdminService) { }

  category: AdminCategory[] = [];
  newCategory: AdminCategory = { catname: '' }

  ngOnInit(): void {
    this.viewCategory();
  }

  addCategory() {
    this.categoryService.addCat(this.newCategory).subscribe((data) => {
      console.log(data);
      console.log("Category Added Successfully")
      this.newCategory = { catname: '' }
    },
      (error) => {
        console.log(error)
      }
    )
  }

  viewCategory() {
    this.categoryService.viewCat().subscribe((data) => {
      console.log(data);
      this.category = data;
    },
      (error) => {
        console.log("Error is : ", error)
      }
    )
  }

  deleteCat(catId?: UUID) {
    if (catId) {
      this.categoryService.deleteCat(catId).subscribe((data) => {
        console.log(data);
        console.log("Category Deleted Successfully");
        this.viewCategory();
      }, (error) => {
        console.log("Error is : ", error);
      }
      )
    }

  }

}
