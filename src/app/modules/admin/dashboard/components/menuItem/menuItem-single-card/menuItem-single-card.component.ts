import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../models/food-menu-item';
import { NgStyle, CurrencyPipe } from '@angular/common';

@Component({
    selector: '[menuItem-single-card]',
    templateUrl: './menuItem-single-card.component.html',
    standalone: true,
    imports: [NgStyle, CurrencyPipe],
})
export class MenuItemSingleCardComponent implements OnInit {
  @Input() menuItem: MenuItem = <MenuItem>{};

  constructor() {}

  ngOnInit(): void {}
}
