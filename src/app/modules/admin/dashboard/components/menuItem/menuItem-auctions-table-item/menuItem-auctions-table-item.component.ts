import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../models/food-menu-item';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: '[menuItem-auctions-table-item]',
    templateUrl: './menuItem-auctions-table-item.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe],
})
export class MenuItemAuctionsTableItemComponent implements OnInit {
  @Input() auction = <MenuItem>{};

  constructor() {}

  ngOnInit(): void {}
}
