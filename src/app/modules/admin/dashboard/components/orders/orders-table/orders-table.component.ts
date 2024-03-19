import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Order } from '../../../../../../core/models';
import { OrdersTableItemComponent } from '../orders-table-item/orders-table-item.component';
import { LoaderComponent } from '../../../../../../shared/components/loader/loader.component';
import { OrdersService } from '../../../../../../services/orders.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { openCreateOrderModal } from '../../../../../../core/state/modal/order/modal.actions';
import { OrderCreateModalComponent } from '../order-create-modal/order-create-modal.component';
import { selectIsCreateOrderModalOpen } from '../../../../../../core/state/modal/order/modal.selectors';
@Component({
  selector: '[orders-table]',
  templateUrl: './orders-table.component.html',
  standalone: true,
  imports: [NgFor, OrdersTableItemComponent, OrderCreateModalComponent, CommonModule, LoaderComponent, AngularSvgIconModule, ButtonComponent],
})
export class OrdersTableComponent implements OnInit {
  public orders: Order[] = [];
  public isLoading: boolean = true;
  private subscriptions: Subscription = new Subscription();
  showCreateOrderModal$ = this.store.select(selectIsCreateOrderModalOpen);

  constructor(private ordersService: OrdersService, private store: Store) {}

  ngOnInit(): void {
    //Fetch orders
    const ordersSub = this.ordersService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching Orders:', error);
        this.isLoading = false;
      },
    });
    const userCreatedSub = this.ordersService.orderCreated$.subscribe((order) => {
      if (order) {
        this.reloadOrders(); // Refetch orders after a new order is created
      }
    });
    const orderDeletedSub = this.ordersService.orderDeleted$.subscribe((deletedOrderId) => {
      if (deletedOrderId) {
        this.orders = this.orders.filter((order) => order.$id !== deletedOrderId);
      }
    });
    this.subscriptions.add(userCreatedSub);
    this.subscriptions.add(orderDeletedSub);
    this.subscriptions.add(ordersSub);
  }

  reloadOrders(): void {
    this.isLoading = true;
    this.ordersService.getAllOrders().subscribe({
      next: (orders) => {
        console.log('Fetched orders:', orders);
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching Users:', error);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openCreateModal() {
    console.log('Dispatching openCreateOrderModal action');
    this.store.dispatch(openCreateOrderModal());
  }
}
