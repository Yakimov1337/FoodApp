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
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
    private userService: UserService,
    private menuItemsService: MenuItemsService,
    private store: Store,
    private toastr: ToastrService,
  ) {
    const currentDate = new Date().toISOString().split('T')[0];
    this.orderForm = this.fb.group({
      user: ['', Validators.required],
      menuItems: new FormArray([]),
      totalCost: [1, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/)]],
      createdOn: [currentDate],
      paid: [false, Validators.required],
      status: ['pending', Validators.required],
    });
  }
  ngOnInit() {
    this.users$ = this.userService.getAllUsers();
    // this.menuItems$ = this.menuItemsService.getAllMenuItems();
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
          this.closeModal();
          this.resetForm(); // Reset form to default state after creation
          this.orderService.orderCreated(order); // Notify about the new Order !!! VERY IMPORTANT- REFETCH THE TABLE
          this.toastr.success('Order created successfully!');
        },
        error: (error: any) => this.toastr.error('Failed to create new order!', error),
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
    this.store.dispatch(closeCreateOrderModal());
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
}
