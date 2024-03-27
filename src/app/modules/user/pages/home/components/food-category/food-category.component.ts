import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-food-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-category.component.html',
})
export class FoodCategoryComponent {

  foods = [
    {
      name: 'Burgers',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
    },
    {
      name: 'Pizza',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/pizza.jpg',
    },
    {
      name: 'Pasta',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/pasta.jpg',
    },
    {
      name: 'Other',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/other.jpg',
    },
    {
      name: 'Burgers',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
    },
    {
      name: 'Burgers',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
    },
    {
      name: 'Burgers',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
    },
    {
      name: 'Burgers',
      description: 'Ground turkey, cheese, hamburger buns, black pepper',
      price: '20$',
      imageUrl: 'assets/images/burger-home.jpg',
    },
  ];


}
