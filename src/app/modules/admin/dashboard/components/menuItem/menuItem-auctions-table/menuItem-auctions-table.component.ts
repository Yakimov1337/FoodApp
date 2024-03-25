import { Observable, Subscription, interval, startWith, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItemAuctionsTableItemComponent } from '../menuItem-auctions-table-item/menuItem-auctions-table-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { MenuItemsService } from '../../../../../../services/menuItems.service';
import { MenuItem } from '../../../../../../core/models';
import { LoaderComponent } from '../../../../../../shared/components/loader/loader.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { openCreateMenuItemModal } from '../../../../../../core/state/modal/menuItem/modal.actions';
import { Store } from '@ngrx/store';
import { PaginationComponent } from '../../../../../../shared/components/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: '[menuItem-auctions-table]',
  templateUrl: './menuItem-auctions-table.component.html',
  standalone: true,
  imports: [
    NgFor,
    AngularSvgIconModule,
    ButtonComponent,
    MenuItemAuctionsTableItemComponent,
    CommonModule,
    LoaderComponent,
    PaginationComponent,
  ],
})
export class MenuItemAuctionsTableComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  public isLoading: boolean = true;
  public currentPage = 1;
  public totalPages!: number;
  public timeSinceLastUpdate$!: Observable<number>;
  public lastUpdated: Date = new Date();

  private subscriptions: Subscription = new Subscription();

  constructor(private menuItemsService: MenuItemsService, private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadMenuItems(this.currentPage);
    this.initializeSubscriptions();
    this.initializeTimeSinceLastUpdate();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadMenuItems(page: number, limit: number = 10): void {
    this.isLoading = true;
    this.menuItemsService.getAllMenuItems(page, limit).subscribe({
      next: (menuItems) => {
        this.menuItems = menuItems;
        this.totalPages = Math.ceil(50 / limit); //change later
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error('Error fetching items:', error);
        this.isLoading = false;
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMenuItems(this.currentPage);
  }

  openCreateModal() {
    console.log('Dispatching openCreateOrderModal action');
    this.store.dispatch(openCreateMenuItemModal());
  }

  private initializeTimeSinceLastUpdate(): void {
    this.timeSinceLastUpdate$ = interval(60000) // Emit value every 60 seconds
      .pipe(
        startWith(0), // Start immediately upon subscription
        switchMap(() => {
          const now = new Date();
          const difference = now.getTime() - this.lastUpdated.getTime();
          return [Math.floor(difference / 60000)]; // Convert to minutes
        }),
      );
  }

  private initializeSubscriptions(): void {
    const menuItemsCreatedSub = this.menuItemsService.menuItemCreated$.subscribe((menuItem) => {
      if (menuItem) {
        this.loadMenuItems(this.currentPage); // Refetch items after a new item is created
      }
    });
    const menuItemsDeletedSub = this.menuItemsService.menuItemDeleted$.subscribe((deleteMenuItemId) => {
      if (deleteMenuItemId) {
        this.menuItems = this.menuItems.filter((menuItem) => menuItem.$id !== deleteMenuItemId);
      }
    });
    this.subscriptions.add(menuItemsCreatedSub);
    this.subscriptions.add(menuItemsDeletedSub);
  }
}
