import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './food-card.component.html',
})
export class FoodCardComponent {
  constructor() {}
}
