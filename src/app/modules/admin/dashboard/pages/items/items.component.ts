import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemAuctionsTableComponent } from '../../components/menuItem/menuItem-auctions-table/menuItem-auctions-table.component';
import { MenuItemCreateModalComponent } from '../../components/menuItem/menuItem-create-modal/menuItem-create-modal.component';
import { MenuItemDeleteModalComponent } from '../../components/menuItem/menuItem-delete-modal/menuItem-delete-modal.component';
import { MenuItemUpdateModalComponent } from '../../components/menuItem/menuItem-update-modal/menuItem-update-modal.component';
import { selectIsCreateMenuItemModalOpen, selectIsDeleteMenuItemModalOpen, selectIsUpdateMenuItemModalOpen } from '../../../../../core/state/modal/menuItem/modal.selectors';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    MenuItemAuctionsTableComponent,
    MenuItemCreateModalComponent,
    MenuItemDeleteModalComponent,
    MenuItemUpdateModalComponent,
  ],
  templateUrl: './items.component.html',
})
export class ItemsComponent {
  showCreateMenuItemModal$ = this.store.select(selectIsCreateMenuItemModalOpen);
  showDeleteMenuItemModal$ = this.store.select(selectIsDeleteMenuItemModalOpen);
  showUpdateMenuItemModal$ = this.store.select(selectIsUpdateMenuItemModalOpen);

  constructor(private store: Store) {}
}
