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

  categories: AdminCategory[] = [];
  newCategory: AdminCategory = { catname: '' }

  ngOnInit(): void {
    this.viewCategory();
  }

  addCategory() {
    this.categoryService.addCat(this.newCategory).subscribe((data) => {
      console.log(data);
      console.log("Category Added Successfully")
      this.newCategory = { catname: '' }
      this.viewCategory();
    },
      (error) => {
        console.log(error)
      }
    )
  }

  viewCategory() {
    this.categoryService.viewCat().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      }
    })
  }

  deleteCat(id?: UUID) {
    if (id) {
      this.categoryService.deleteCat(id).subscribe((data) => {
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
