import { Component, OnInit } from '@angular/core';
import { LibraryshowComponent } from "../libraryshow/libraryshow.component";
import { UUID } from 'crypto';
import { Cart } from '../../admin-cart';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminProduct } from '../../admin-product';
import { Console, error } from 'console';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [LibraryshowComponent, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  userId: UUID | null = null;
  productId : UUID | null =null;
  carts: Cart[] = [];
  products : AdminProduct [] = [];
  total: number = 0;


  constructor(private route: ActivatedRoute, private router: Router, private cartService: UserServiceService,private productService : UserServiceService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] || null;
      // this.productId = params['productId'] || null;

      if (!this.userId) {
        console.log("User ID not found. Redirecting to login.");
        this.router.navigate(['/login']);
      } 
      else {
       this.viewAllCartData();
      }
    });
  }

  viewAllCartData()
  {
    if (!this.userId) return; // Prevents unnecessary calls if userId is missing

    this.cartService.viewAllCart(this.userId).subscribe({
      next: (carts: Cart[]) => {
        this.carts = carts;
        this.total = 0;
  
        // Fetch product details for each cart item
        this.carts.forEach(cart => {
          if (cart.product == null && cart.id) { // Only fetch if product is missing
            this.fetchProductDetails(cart.id);
          }
        });
      },
      error: (error) => {
        console.error('Error loading cart:', error);
      }
    });
  }

  fetchProductDetails(productId: UUID): void {
    this.productService.getProductById(productId).subscribe({
      next: (productData: AdminProduct) => {
        console.log("Fetched product details:", productData);
        
        // Find the cart item and update it with the product details
        const cartItem = this.carts.find(cart => cart.id === productId);
        if (cartItem) {
          cartItem.product = productData;
          this.total += productData.pprice * parseInt(cartItem.pqty); // Update total price
        }
      },
      error: (error) => {
        console.error("Error fetching product details:", error);
      }
    });
  }

  viewcartproducts()
  {
    this.cartService.viewCartAllProduct().subscribe((data)=>{
      console.log("Get All product Data is : ",data);
      this.carts = data;
    },(error)=>{
      console.log("Error is : ",error);
    })
  }

  // viewproduct() {
  //   this.productService.viewproduct().subscribe({
  //     next : (data)=>{
  //       console.log('Product items received:', data);
  //       this.products = data || [];
        
  //     },error : (error)=>{
  //       console.error('Error loading product:', error);
  //     }

  //   })
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
      next: () => {
        console.log("Product successfully added to cart!");
        console.log("UserId is : ", this.userId);
        console.log("ProductId is : ", productId);
      },
      error: (error) => {
        console.error("Error adding to cart:", error.error || error.message);
        console.error("UserId is : ", this.userId);
        console.error("ProductId is : ", productId);
      }
    });


  }

  // Navigate back to products
  goToProducts(): void {
    if (!this.userId) {
      console.error("User ID is missing. Redirecting to login.");
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/viewproduct'], { queryParams: { userId: this.userId } });
    }
  }

}
// fetchProductDetails(productId: UUID | undefined) {

  //   if (productId) {
  //     this.productService.viewCart(productId).subscribe({
  //       next: (productDataArray: AdminProduct[]) => {
  //         console.log("Product Data Array Received:", productDataArray);

  //         if (productDataArray.length > 0) {
  //           const productData = productDataArray[0]; 

  //           // Find the cart item and attach the fetched product details
  //           const cartItem = this.carts.find(item => item.id === productId);
  //           if (cartItem) {
  //             cartItem.product = productData;  
  //           }
  //         } else {
  //           console.error("No product found for ID:", productId);
  //         }
  //       },
  //       error: (error) => {
  //         console.error("Error fetching product details:", error);
  //       }
  //     });
  //   }
  // }

   // Remove item from cart
  // removeFromCart(cartId: string): void {
  //   this.cartService.removeFromCart(cartId).subscribe({
  //     next: () => {
  //       console.log("Item removed from cart!");
  //       this.loadCart();
  //     },
  //     error: (error) => {
  //       console.error("Error removing from cart:", error);
  //     }
  //   });
  // }