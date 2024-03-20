import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuItem } from '../../../../../../core/models';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import {
  openDeleteMenuItemModal,
  openUpdateMenuItemModal,
} from '../../../../../../core/state/modal/menuItem/modal.actions';

@Component({
  selector: '[menuItem-auctions-table-item]',
  templateUrl: './menuItem-auctions-table-item.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, CurrencyPipe, ButtonComponent],
})
export class MenuItemAuctionsTableItemComponent implements OnInit {
  @Input() menuItem: MenuItem = <MenuItem>{};
  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log();
  }

  openUpdateModal() {
    this.store.dispatch(openUpdateMenuItemModal({ menuItem: this.menuItem }));
  }

  openDeleteModal() {
    this.store.dispatch(openDeleteMenuItemModal({ menuItemId: this.menuItem.$id }));
  }
}
