import { Component } from '@angular/core';

import { Order } from '../../../../../core/models';
import { OrdersService } from '../../../../../services/orders.service';
import { OrdersTableComponent } from '../../components/orders/orders-table/orders-table.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrdersTableComponent],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  public orders: Order[] = [];
  public isLoading: boolean = true;

  constructor(private ordersService: OrdersService) {}

  async ngOnInit(): Promise<void> {
    try {
      // Call getAllMenuOrders() from the MenuOrders service
      this.orders = await this.ordersService.getAllOrders();
      this.isLoading=false;
    } catch (error) {
      console.error('Error fetching MenuOrders:', error);
      this.isLoading=false;
    }
  }
}
