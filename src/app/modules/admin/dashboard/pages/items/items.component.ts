import { Component } from '@angular/core';
import { MenuItemAuctionsTableComponent } from '../../components/menuItem/menuItem-auctions-table/menuItem-auctions-table.component';
import { MenuItem } from '../../../../../core/models';
import { MenuItemsService } from '../../../../../services/menuItems.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [MenuItemAuctionsTableComponent],
  templateUrl: './items.component.html',
})
export class ItemsComponent {
  public items: MenuItem[] = [];
  public isLoading: boolean = true;

  constructor(private menuItemsService: MenuItemsService) {}

  async ngOnInit(): Promise<void> {
    try {
      // Call getAllMenuItems() from the MenuItems service
      this.items = await this.menuItemsService.getAllMenuItems();
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching MenuItems:', error);
      this.isLoading = false;
    }
  }
}
