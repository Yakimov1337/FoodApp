import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from '../pages/home/components/hero-section/hero-section.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule , NavbarComponent,FooterComponent],
})
export class LayoutComponent {}
