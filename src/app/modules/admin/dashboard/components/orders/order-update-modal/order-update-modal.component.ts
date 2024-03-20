import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItem, Order, User } from '../../../../../../core/models';
import { selectOrderToUpdate } from '../../../../../../core/state/modal/order/modal.selectors';
import { closeUpdateOrderModal } from '../../../../../../core/state/modal/order/modal.actions';
import { OrdersService } from '../../../../../../services/orders.service';
import { MenuItemsService } from '../../../../../../services/menuItems.service';
import { UserService } from '../../../../../../services/user.service';
import { CommonModule, formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { asyncSimpleDateValidator } from '../../../../../../shared/validators/date-format-validator';

@Component({
  selector: '[order-update-modal]',
  templateUrl: './order-update-modal.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class OrderUpdateModalComponent implements OnInit {
  orderForm: FormGroup;
  menuItems$: Observable<MenuItem[]>;
  users$: Observable<User[]>;
  private currentOrderId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private ordersService: OrdersService,
    private userService: UserService,
    private menuItemsService: MenuItemsService,
    private toastr: ToastrService,
  ) {
    // Initialize the form with structure
    this.orderForm = this.fb.group({
      user: ['', Validators.required],
      totalCost: ['', Validators.required],
      createdOn: ['', Validators.required],
      status: ['', Validators.required],
      menuItems: this.fb.array([]),
    });

    this.menuItems$ = this.menuItemsService.getAllMenuItems();
    this.users$ = this.userService.getAllUsers();
  }

  ngOnInit(): void {
    this.store.select(selectOrderToUpdate).subscribe((order) => {
      if (order) {
        this.currentOrderId = order.$id;
        const formattedCreatedOn = formatDate(order.createdOn, 'yyyy-MM-dd', 'en-US');

        this.orderForm.patchValue({
          user: order.user?.$id,
          totalCost: order.totalCost,
          createdOn: formattedCreatedOn,
          status: order.status,
        });
      }
    });
  }

  updateOrder(): void {
    if (this.orderForm.valid && this.currentOrderId) {
      this.ordersService.updateOrder(this.currentOrderId, this.orderForm.value).subscribe({
        next: (order) => {
          this.closeModal();
          this.ordersService.orderCreated(order); //Notify about order update
          this.toastr.success('Order updated successfully!');
        },
        error: (error) => this.toastr.error('Error updating this order:', error),
      });
    } else {
      this.orderForm.markAllAsTouched();
      // If the form is invalid, iterate over the controls and log the errors
      Object.keys(this.orderForm.controls).forEach((key) => {
        const control = this.orderForm.get(key);
        const errors = control?.errors ?? {};
        Object.keys(errors).forEach((keyError) => {
          this.toastr.error(`Form Invalid - control: ${key}, Error: ${keyError}`);
        });
      });
    }
  }

  closeModal(): void {
    this.store.dispatch(closeUpdateOrderModal());
  }
}
