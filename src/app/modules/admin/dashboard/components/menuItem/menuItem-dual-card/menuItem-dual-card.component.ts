import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../models/food-menu-item';
import { NgStyle, CurrencyPipe } from '@angular/common';

@Component({
    selector: '[menuItem-dual-card]',
    templateUrl: './menuItem-dual-card.component.html',
    standalone: true,
    imports: [NgStyle, CurrencyPipe],
})
export class MenuItemDualCardComponent implements OnInit {
  @Input() menuItem: MenuItem = <MenuItem>{};

  constructor() {}

  ngOnInit(): void {}
}
