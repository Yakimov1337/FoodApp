import { Component, Input, OnInit } from '@angular/core';
import { OrdersTableItemComponent } from '../orders-table-item/orders-table-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { Order } from '../../../../../../core/models';
import { LoaderComponent } from '../../../../../../shared/components/loader/loader.component';

@Component({
  selector: '[orders-table]',
  templateUrl: './orders-table.component.html',
  standalone: true,
  imports: [NgFor, OrdersTableItemComponent, CommonModule, LoaderComponent],
})
export class OrdersTableComponent implements OnInit {
  @Input() orders: Order[] = [];
  @Input() isLoading: boolean = false;

  constructor() {}

  async ngOnInit(): Promise<void> {}
}
