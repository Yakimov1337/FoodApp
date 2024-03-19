import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MenuItem, Order, User } from '../../../../../../core/models';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { OrdersService } from '../../../../../../services/orders.service';
import { closeCreateOrderModal } from '../../../../../../core/state/modal/order/modal.actions';
import { UserService } from '../../../../../../services/user.service';
import { MenuItemsService } from '../../../../../../services/menuItems.service';

@Component({
  selector: '[order-create-modal]',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-create-modal.component.html',
})
export class OrderCreateModalComponent {
  orderForm: FormGroup;
  users$: Observable<User[]> = of([]); //initial value
  menuItems$!: Observable<MenuItem[]>;
  dropdownOpen: boolean = false;


  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
    private userService: UserService,
    private menuItemsService: MenuItemsService,
    private store: Store,
    ) {
    const currentDate = new Date().toISOString().split('T')[0];
    this.orderForm = this.fb.group({
      user: ['', Validators.required],
      menuItems: new FormArray([]),
      totalCost: [1,Validators.required],
      createdOn: [currentDate],
      status: ['pending', Validators.required],
    });
  }
  ngOnInit() {
    this.users$ = this.userService.getAllUsers();
    this.menuItems$ = this.menuItemsService.getAllMenuItems();
    console.log(this.dropdownOpen)
  }

  // Function to handle form submission
  createOrder(): void {
    if (this.orderForm.valid) {
      const orderData = {
        ...this.orderForm.value,
        menuItems: this.orderForm.value.menuItems.map((control: FormControl) => control.value),
      };
      this.orderService.createOrder(orderData).subscribe({
        next: (order: Order) => {
          console.log('Order created successfully', order);
          this.closeModal();
          this.resetForm(); // Reset form to default state after creation
          this.orderService.orderCreated(order); // Notify about the new Order !!! VERY IMPORTANT- REFETCH THE TABLE
        },
        error: (error: Error) => {
          // Handle error
          console.error('Error creating Order', error);
        },
      });
    } else {
      // If the form is invalid, iterate over the controls and log the errors
      Object.keys(this.orderForm.controls).forEach((key) => {
        const control = this.orderForm.get(key);
        const errors = control?.errors ?? {};
        Object.keys(errors).forEach((keyError) => {
          console.log(`Form Invalid - control: ${key}, Error: ${keyError}, value: `, errors[keyError]);
        });
      });
    }
  }

  onMenuItemChange(itemId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const isChecked = input ? input.checked : false;
    const menuItems = this.orderForm.controls['menuItems'] as FormArray;

    if (isChecked) {
      // Add the ID to the array if it's checked and not already present
      if (!menuItems.value.includes(itemId)) {
        menuItems.push(new FormControl(itemId));
      }
    } else {
      // Remove the ID from the array if it's unchecked
      const index = menuItems.value.indexOf(itemId);
      if (index >= 0) {
        menuItems.removeAt(index);
      }
    }
  }


  closeModal(): void {
    this.store.dispatch(closeCreateOrderModal());
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  resetForm(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.orderForm.reset({
      user: '',
      menuItems: new FormArray([]),
      totalCost: '1',
      createdOn: currentDate,
      status: 'pending',
    });
  }
  closeModalIfClickedOutside(event: MouseEvent): void {
    console.log('Target:', event.target);
    console.log('CurrentTarget:', event.currentTarget);
    // Log the class or ID of the target to understand what's being clicked
    console.log('Target class:', (event.target as Element).className);
    console.log('CurrentTarget class:', (event.currentTarget as Element).className);

    if (event.target === event.currentTarget) {
      this.store.dispatch(closeCreateOrderModal());
    }
  }
}

