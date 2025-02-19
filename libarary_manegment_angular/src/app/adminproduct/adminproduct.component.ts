import { Component, OnInit } from '@angular/core';
import { AdminComponent } from "../admin/admin.component";
import { AdminProduct } from '../../admin-product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { AdminCategory } from '../../admin-category';
import { UUID } from 'node:crypto';


@Component({
  selector: 'app-adminproduct',
  standalone: true,
  imports: [AdminComponent, FormsModule, CommonModule],
  templateUrl: './adminproduct.component.html',
  styleUrl: './adminproduct.component.css'
})
export class AdminproductComponent implements OnInit {

  products: AdminProduct[] = [];
  categories: AdminCategory[] = [];
  selectedCategory: number = 0;
  newProduct: AdminProduct = { pname: '', pprice: '', pqty: '', pauthor: '', planguage: '', pimage: '', pdescription: '' }
  imageFile?: File;

  constructor(private productService: AdminService, private categoryService: AdminService) { }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0]; // Get selected file
  }

  ngOnInit(): void {
    this.getCategories();
    this.viewproduct();
  }

  getCategories() {
    this.categoryService.viewCat().subscribe((data) => {
      this.categories = data;
    })
  }

  addproduct() {
    const formData = new FormData();
    formData.append('pname', this.newProduct.pname);
    formData.append('pprice', this.newProduct.pprice);
    formData.append('pqty', this.newProduct.pqty);
    formData.append('pauthor', this.newProduct.pauthor);
    formData.append('planguage', this.newProduct.planguage);
    formData.append('pdescription', this.newProduct.pdescription);
    formData.append('catid', this.selectedCategory.toString());

    if (this.imageFile) {
      formData.append('pimage', this.imageFile);
    }

    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.newProduct = { pname: '', pprice: '', pqty: '', pauthor: '', planguage: '', pimage: '', pdescription: '' };
        this.viewproduct();
      },
      error: (error) => {
        alert("Error Product not Register")
        console.log(error)
        this.viewproduct();
      }
    })
  }

  viewproduct() {
    this.productService.viewProduct().subscribe((data) => {
      console.log(data)
      this.products = data;
    }, (error) => {
      console.log(error)
    }
    )
  }

  deleteProduct(id?: UUID) {
    if (id) {
      this.productService.deleteProduct(id).subscribe((data) => {
        console.log(data);
        console.log("Product delete Successfully");
        this.viewproduct();
      }, (error) => {
        console.log("Error is : ", error)
      })
    }
  }
}