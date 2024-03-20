import { Component, Input, OnInit } from '@angular/core';
import { NgStyle, CurrencyPipe } from '@angular/common';
import { MenuItem } from '../../../../../../core/models';

@Component({
  selector: '[menuItem-dual-card]',
  templateUrl: './menuItem-dual-card.component.html',
  standalone: true,
  imports: [NgStyle, CurrencyPipe],
})
export class MenuItemDualCardComponent  {
  @Input() menuItem: MenuItem = <MenuItem>{};

  constructor() {
  }

  ngOnInit(): void {}
}
