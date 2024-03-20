import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItemAuctionsTableItemComponent } from '../menuItem-auctions-table-item/menuItem-auctions-table-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { MenuItemsService } from '../../../../../../services/menuItems.service';
import { MenuItem } from '../../../../../../core/models';
import { LoaderComponent } from '../../../../../../shared/components/loader/loader.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { openCreateMenuItemModal } from '../../../../../../core/state/modal/menuItem/modal.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: '[menuItem-auctions-table]',
  templateUrl: './menuItem-auctions-table.component.html',
  standalone: true,
  imports: [
    NgFor,
    AngularSvgIconModule,
    ButtonComponent,
    MenuItemAuctionsTableItemComponent,
    CommonModule,
    LoaderComponent,
  ],
})
export class MenuItemAuctionsTableComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  public isLoading: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private menuItemsService: MenuItemsService, private store: Store) {}

  ngOnInit(): void {
    //Fetch items
    const menuItemsSub = this.menuItemsService.getAllMenuItems().subscribe({
      next: (menuItems) => {
        this.menuItems = menuItems;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
        this.isLoading = false;
      },
    });
    const menuItemsCreatedSub = this.menuItemsService.menuItemCreated$.subscribe((menuItem) => {
      if (menuItem) {
        this.reloadOrders(); // Refetch items after a new item is created
      }
    });
    const menuItemsDeletedSub = this.menuItemsService.menuItemDeleted$.subscribe((deleteMenuItemId) => {
      if (deleteMenuItemId) {
        this.menuItems = this.menuItems.filter((menuItem) => menuItem.$id !== deleteMenuItemId);
      }
    });
    this.subscriptions.add(menuItemsCreatedSub);
    this.subscriptions.add(menuItemsDeletedSub);
    this.subscriptions.add(menuItemsSub);
  }

  reloadOrders(): void {
    this.isLoading = true;
    this.menuItemsService.getAllMenuItems().subscribe({
      next: (menuItems) => {
        console.log('Fetched items:', menuItems);
        this.menuItems = menuItems;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openCreateModal() {
    console.log('Dispatching openCreateOrderModal action');
    this.store.dispatch(openCreateMenuItemModal());
  }
}
