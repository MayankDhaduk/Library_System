import { Component, OnInit } from '@angular/core';
import { LibraryshowComponent } from "../libraryshow/libraryshow.component";
import { AdminProduct } from '../../admin-product';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UUID } from 'crypto';
import { Cart } from '../../admin-cart';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCategory } from '../../admin-category';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-viewproductinuser',
  standalone: true,
  imports: [LibraryshowComponent, CommonModule, FormsModule],
  templateUrl: './viewproductinuser.component.html',
  styleUrl: './viewproductinuser.component.css'
})
export class ViewproductinuserComponent implements OnInit {

  products: AdminProduct[] = [];
  carts: Cart[] = [];
  categories: AdminCategory[] = [];
  total: number = 0;
  userId: UUID | null = null;

  constructor(private productService: UserServiceService, private cartService: UserServiceService, private userService: UserServiceService, private route: ActivatedRoute, private categoryService: AdminService) { }

  ngOnInit(): void {
    this.viewproduct();
    this.viewcategory();
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] || null;
      if (!this.userId) {
        console.error("User ID not found in query params");
      }
    })
  }

  viewproduct() {
    this.productService.viewproduct().subscribe((data) => {
      this.products = data;
      console.log(data)
    }, (error) => {
      console.log("Error is : ", error);
    }
    )
  }

  viewcategory() {
    this.categoryService.viewCat().subscribe((data) => {
      console.log("Categories Is : ", data);
      this.categories = data;
    },
      (error) => {
        console.log("Error is : ", error);
      }
    )
  }


  getProductByCategory(catname: string) {
    this.productService.getProductByCategory(catname).subscribe({
      next: (data) => {
        console.log("Data is : ", data);
        this.products = data;
      }, error: (error) => {
        console.log("Error is : ", error);
      }
    })
  }
  // addCart(productId: UUID | undefined, userId?: UUID) {
  //   if (userId && productId) {
  //     this.cartService.addtoCart(userId, productId).subscribe({
  //       next: (data) => {
  //         console.log(data)
  //         this.router.navigate(['/dfgfd'])
  //       },
  //       error: (error) => {
  //         console.error("Error is  : ", error);
  //       }
  //     })
  //   }

  // }

  addcat(productId: UUID | undefined) {
    if (!productId) {
      console.error("Invalid Product ID: Cannot add undefined product.");
      return;
    }


    if (!this.userId) {
      console.error("User not logged in");
      return;
    }


    this.cartService.addToCart(this.userId, productId).subscribe({
      next: (response) => {
        this.carts.push(response)
        console.log("Product successfully added to cart!");
        console.log("UserId is : ", this.userId);
        console.log("ProductId is : ", productId);
      },
      error: (error) => {
        console.error("Error adding to cart:", error.error || error.message);
        console.log("UserId is : ", this.userId);
        console.log("ProductId is : ", productId);
      }
    });


  }

  // loadCart(userId?: UUID) {
  //   if (userId) {
  //     this.cartService.viewCart(userId).subscribe({
  //       next: (data) => {
  //         this.carts = data;
  //         this.total = this.carts.reduce((sum, item) => sum + item.product.pprice * item.qty, 0);
  //       }, error: (error) => {
  //         console.log("Error is : ", error)
  //       }
  //     })
  //   }
  // }

}