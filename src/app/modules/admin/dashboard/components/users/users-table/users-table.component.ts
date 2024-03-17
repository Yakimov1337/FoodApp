import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UsersTableItemComponent } from '../users-table-item/users-table-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { MenuItem, User } from '../../../../../../core/models';
import { LoaderComponent } from '../../../../../../shared/components/loader/loader.component';
import { openCreateUserModal } from '../../../../../../core/state/modal/modal.actions';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../../../services/user.service';

@Component({
  selector: '[users-table]',
  templateUrl: './users-table.component.html',
  standalone: true,
  imports: [NgFor, AngularSvgIconModule, ButtonComponent, UsersTableItemComponent, CommonModule, LoaderComponent],
})
export class UsersTableComponent implements OnInit {
  public users: User[] = [];
  public isLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store,private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const subscription = this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching Users:', error);
        this.isLoading = false;
      },
    });
    const userCreatedSub = this.userService.userCreated$.subscribe(user => {
      if (user) {
        console.log('user reaload')
        this.loadUsers(); // Refetch users after a new user is created
      }
    });
    const userDeletedSub = this.userService.userDeleted$.subscribe((deletedUserId) => {
      if (deletedUserId) {
        this.users = this.users.filter((user) => user.$id !== deletedUserId);
      }
    });

    // Store subscriptions
    this.subscriptions.add(subscription);
    this.subscriptions.add(userCreatedSub);
    this.subscriptions.add(userDeletedSub);
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Fetched users:', users); // Add this line
        this.users = users;
        this.isLoading = false;
        // this.cdr.detectChanges() // Re-render children user table
      },
      error: (error) => {
        console.error('Error fetching Users:', error);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  openCreateModal() {
    console.log('Dispatching openCreateUserModal action');
    this.store.dispatch(openCreateUserModal());
  }
}
