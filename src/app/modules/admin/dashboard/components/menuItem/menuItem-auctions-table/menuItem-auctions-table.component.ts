import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../models/food-menu-item';
import { MenuItemAuctionsTableItemComponent } from '../menuItem-auctions-table-item/menuItem-auctions-table-item.component';
import { NgFor } from '@angular/common';
import { OrdersService } from '../../../../../../services/orders.service';

@Component({
  selector: '[menuItem-auctions-table]',
  templateUrl: './menuItem-auctions-table.component.html',
  standalone: true,
  imports: [NgFor, MenuItemAuctionsTableItemComponent],
})
export class MenuItemAuctionsTableComponent implements OnInit {
  public activeAuction: MenuItem[] = [];

  constructor(private ordersService: OrdersService) {} 

  async ngOnInit(): Promise<void> {
    try {
      // Call getAllOrders() from the orders service
      this.activeAuction = await this.ordersService.getAllOrders();
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Handle error appropriately
    }
  }
}
