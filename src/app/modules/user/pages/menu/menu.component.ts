import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from '../../../../core/models';
import { MenuItemsService } from '../../../../services/menuItems.service';
import { FoodCardComponent } from './food-card/food-card.component';
import { FoodCategoryComponent } from './food-category/food-category.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FoodCardComponent, FoodCategoryComponent, LoaderComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, OnDestroy {
  allMenuItems: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  isLoading = true;
  selectedCategory: string = 'burger';
  private queryParamsSubscription: Subscription | null = null;

  constructor(private menuItemsService: MenuItemsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Listen to category changes from URL and adjust displayed items accordingly
    this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        // If there's a category in the URL, use it
        this.selectedCategory = params['category'];
      } else {
        // If not, navigate to the URL with the default category as a query param
        this.router.navigate(['/menu'], { queryParams: { category: this.selectedCategory } });
      }
      this.fetchMenuItems();
    });
  }

  fetchMenuItems(): void {
    if (!this.allMenuItems.length) { // Check if items have already been fetched
      this.isLoading = true;
      this.menuItemsService.getAllMenuItems(1, 100).subscribe({
        next: (items) => {
          this.allMenuItems = items; // Saving all items then only filter based on selected category
          // Filter immediately after fetching based on the selected category
          this.filterItemsByCategory();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to fetch menu items', error);
          this.isLoading = false;
        },
      });
    } else {
      this.filterItemsByCategory(); // Filter existing items if they've already been fetched
    }
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.filterItemsByCategory();
    this.router.navigate(['/menu'], { queryParams: { category: this.selectedCategory.toLowerCase() } });
  }
  private filterItemsByCategory(): void {
    this.menuItems = this.allMenuItems.filter(
      (item) => item.category.toLowerCase() === this.selectedCategory.toLowerCase(),
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
