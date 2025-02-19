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

  addCategory(id?: UUID) {
    if (id) {
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

  getCategoryId(id?: UUID) {
    if (id) {
      this.categoryService.getCategoryById(id).subscribe((data) => {
        console.log(data)
        this.newCategory = data;
      }, (error) => {
        console.log("Error is : ", error)
      }
      )
    }
  }

  updateCategory(id?: UUID) {
    if (id) {
      this.categoryService.updateCategory(id, this.newCategory).subscribe({
        next: (data) => {
          console.log("Category Updated Successfully");
          console.log("Updated Category Is : ", data);
          this.newCategory = { catname: '' };
          this.viewCategory();
        }, error: (error) => {
          console.log("Error is : ", error);
        }
      })
    }
  }
}