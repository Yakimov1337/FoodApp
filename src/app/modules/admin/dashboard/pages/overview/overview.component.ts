import { Component, OnInit } from '@angular/core';
import { MenuItemAuctionsTableComponent } from '../../components/menuItem/menuItem-auctions-table/menuItem-auctions-table.component';
import { MenuItemChartCardComponent } from '../../components/menuItem/menuItem-chart-card/menuItem-chart-card.component';
import { MenuItemSingleCardComponent } from '../../components/menuItem/menuItem-single-card/menuItem-single-card.component';
import { MenuItemDualCardComponent } from '../../components/menuItem/menuItem-dual-card/menuItem-dual-card.component';
import { MenuItemHeaderComponent } from '../../components/menuItem/menuItem-header/menuItem-header.component';
import { MenuItemsService } from '../../../../../services/menuItems.service';
import { MenuItem } from '../../../../../core/models';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../../../../shared/components/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-MenuItem',
    templateUrl: './overview.component.html',
    standalone: true,
    imports: [
        MenuItemHeaderComponent,
        MenuItemDualCardComponent,
        MenuItemSingleCardComponent,
        MenuItemChartCardComponent,
        MenuItemAuctionsTableComponent,
        LoaderComponent,
        CommonModule,
    ],
})
export class OverviewComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  public isLoading: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private menuItemsService: MenuItemsService) {}

  ngOnInit(): void {
    //Fetch items
    const menuItemsSub = this.menuItemsService.getAllMenuItems().subscribe({
      next: (menuItems) => {
        this.menuItems = menuItems;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
        this.isLoading = false;
      },
    });
    this.subscriptions.add(menuItemsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
