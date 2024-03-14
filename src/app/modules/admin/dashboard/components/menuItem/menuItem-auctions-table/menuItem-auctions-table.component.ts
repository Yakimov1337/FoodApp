import { Component, Input, OnInit } from '@angular/core';
import { MenuItemAuctionsTableItemComponent } from '../menuItem-auctions-table-item/menuItem-auctions-table-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { MenuItemsService } from '../../../../../../services/menuItems.service';
import { MenuItem } from '../../../../../../core/models';
import { LoaderComponent } from '../../../../../../shared/components/loader/loader.component';

@Component({
  selector: '[menuItem-auctions-table]',
  templateUrl: './menuItem-auctions-table.component.html',
  standalone: true,
  imports: [NgFor, MenuItemAuctionsTableItemComponent, CommonModule, LoaderComponent],
})
export class MenuItemAuctionsTableComponent implements OnInit {
  @Input() items: MenuItem[] = [];
  @Input() isLoading: boolean = false;

  constructor() {}

  async ngOnInit(): Promise<void> {}
}
