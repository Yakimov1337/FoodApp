import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../core/state/auth/auth.actions';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FoodCategoryComponent } from './components/food-category/food-category.component';
import { InfoSectionComponent } from './components/info-section/info-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,HeroSectionComponent,InfoSectionComponent,FoodCategoryComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService, private store: Store) {}
  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
