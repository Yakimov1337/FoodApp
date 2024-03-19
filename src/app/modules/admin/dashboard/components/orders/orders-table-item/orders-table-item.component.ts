import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Order } from '../../../../../../core/models';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { openDeleteOrderModal, openUpdateOrderModal } from '../../../../../../core/state/modal/order/modal.actions';

@Component({
  selector: '[orders-table-item]',
  templateUrl: './orders-table-item.component.html',
  standalone: true,
  imports: [
    AngularSvgIconModule,
    CurrencyPipe,
    ButtonComponent,
    CommonModule,
  ],
})
export class OrdersTableItemComponent implements OnInit {
  @Input() order: Order = <Order>{};

  constructor(private store: Store) {}

  ngOnInit(): void {}

  openUpdateModal() {
    this.store.dispatch(openUpdateOrderModal({ order: this.order }));
  }

  openDeleteModal() {
    this.store.dispatch(openDeleteOrderModal({ orderId: this.order.$id }));
  }
}
