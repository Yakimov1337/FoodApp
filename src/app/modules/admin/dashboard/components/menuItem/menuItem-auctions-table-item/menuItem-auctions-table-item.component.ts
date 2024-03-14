import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuItem } from '../../../../../../core/models';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';

@Component({
    selector: '[menuItem-auctions-table-item]',
    templateUrl: './menuItem-auctions-table-item.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe,ButtonComponent],
})
export class MenuItemAuctionsTableItemComponent implements OnInit {
  @Input() item: MenuItem = <MenuItem>{};
  constructor() {}


  ngOnInit(): void {  console.log()}
}
