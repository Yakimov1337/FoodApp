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
    // Subscribe to the current order to update
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

        // Populate menu items
        this.populateMenuItemsFormArray(order.menuItems);
      }
    });
  }

  updateOrder(): void {
    if (this.orderForm.valid && this.currentOrderId) {
      const selectedMenuItems = this.getSelectedMenuItemsIds();
      const updateValue = {
        ...this.orderForm.value,
        menuItems: selectedMenuItems,
        $id: this.currentOrderId,
      };
      this.ordersService.updateOrder(this.currentOrderId, updateValue).subscribe({
        next: (order) => {
          console.log('Order updated successfully.');
          this.ordersService.orderCreated(order);
          this.closeModal();
        },
        error: (error) => console.error('Error updating order:', error),
      });
    }
  }

  getSelectedMenuItemsIds(): string[] {
    const selectedIds: string[] = [];
    (this.orderForm.get('menuItems') as FormArray).controls.forEach((control, index) => {
      if (control.value) {
        this.menuItems$.subscribe((menuItems) => {
          const menuItem = menuItems[index];
          selectedIds.push(menuItem.$id);
        });
      }
    });
    return selectedIds;
  }

  populateMenuItemsFormArray(menuItems: MenuItem[]): void {
    const menuItemsControl = this.orderForm.get('menuItems') as FormArray;
    menuItemsControl.clear(); // Clear existing controls

    // Subscribe to all available menu items to determine which ones are selected
    this.menuItems$.subscribe(allMenuItems => {
      allMenuItems.forEach(menuItem => {
        // Check if the current menuItem is selected in the order
        const isSelected = menuItems.some(selectedItem => selectedItem.$id === menuItem.$id);
        menuItemsControl.push(this.fb.control(isSelected));
      });
    });
  }


  closeModal(): void {
    this.store.dispatch(closeUpdateOrderModal());
  }
}
