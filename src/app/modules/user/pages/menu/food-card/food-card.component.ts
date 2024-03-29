import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../../../../core/models';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [RouterLink,CommonModule,CurrencyPipe],
  templateUrl: './food-card.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600 )
      ]),
      transition(':leave', [
        animate(600, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FoodCardComponent {
  @Input() item!: MenuItem;
  showFullDescription = false;
  constructor() {}

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
