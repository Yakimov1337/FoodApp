import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../../../../core/models';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { addItem } from '../../../../../core/state/shopping-cart/cart.actions';
import { ToastrService } from 'ngx-toastr';
import { selectCartItems } from '../../../../../core/state/shopping-cart/cart.selectors';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [RouterLink,CommonModule,CurrencyPipe],
  templateUrl: './food-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate('0.5s ease-in', style({ opacity: 1 }))]),
      transition(':leave', [animate('0.5s ease-out', style({ opacity: 0 }))])
    ]),
  ]
})
export class FoodCardComponent {
  @Input() item!: MenuItem;
  imageLoaded= false;
  showFullDescription = false;

  constructor(private store: Store,private toastr:ToastrService) {}

  ngOnInit(): void {}

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  addToCart(item: MenuItem): void {
    this.store.select(selectCartItems).pipe(
      take(1), // Take the first item only and automatically unsubscribe, prevents duplicates in cart
      map((items: MenuItem[]) => {
        const exists = items.some(existingItem => existingItem.$id === item.$id);
        if (exists) {
          this.toastr.info('Item is already added');
        } else {
          this.toastr.success('Item added to cart!');
          this.store.dispatch(addItem({ item }));
        }
      })
    ).subscribe();
  }
}
