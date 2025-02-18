import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'crypto';

@Component({
  selector: 'app-libraryshow',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './libraryshow.component.html',
  styleUrl: './libraryshow.component.css'
})
export class LibraryshowComponent {
  userId: UUID | null = null;
  // productId: UUID | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] || null;
      // this.productId = params['productId'] || null;
    });
  }

  goToCart(): void {
    if (!this.userId) {
      console.error("User ID missing. Redirecting to login.");
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/viewcart'], { queryParams: { userId: this.userId } });
    }
  }
}
