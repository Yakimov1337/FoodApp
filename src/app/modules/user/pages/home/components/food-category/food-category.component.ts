import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-food-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './food-category.component.html',
})
export class FoodCategoryComponent {
  constructor(private router: Router) {}
  navigateToMenuWithCategory(category: string): void {
    this.router.navigate(['/menu'], { queryParams: { category: category.toLowerCase() } });
  }

  foods = [
    {
      name: 'Burgers',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
      category: 'Burger',
    },
    {
      name: 'Pizza',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/pizza.jpg',
      category: 'Pizza',
    },
    {
      name: 'Pasta',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/pasta.jpg',
      category: 'Pasta',
    },
    {
      name: 'Sushi',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/other.jpg',
      category: 'Sushi',
    },
    {
      name: 'Salad',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
      category: 'Salad',
    },
    {
      name: 'Tacos',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
      category: 'Tacos',
    },
    {
      name: 'Dessert',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
      category: 'Dessert',
    },
    {
      name: 'Other',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
      category: 'Other',
    },
  ];
}
