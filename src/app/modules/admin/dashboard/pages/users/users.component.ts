import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { UsersTableComponent } from '../../components/users/users-table/users-table.component';
import { UserCreateModalComponent } from '../../components/users/user-create-modal/user-create-modal.component';
import { UserDeleteModalComponent } from '../../components/users/user-delete-modal/user-delete-modal.component';
import { UserUpdateModalComponent } from '../../components/users/user-update-modal/user-update-modal.component';
import { selectIsCreateUserModalOpen, selectIsDeleteUserModalOpen, selectIsUpdateUserModalOpen } from '../../../../../core/state/modal/user/modal.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UsersTableComponent, UserCreateModalComponent, UserDeleteModalComponent, UserUpdateModalComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  showCreateUserModal$ = this.store.select(selectIsCreateUserModalOpen);
  showDeleteUserModal$ = this.store.select(selectIsDeleteUserModalOpen);
  showUpdateUserModal$ = this.store.select(selectIsUpdateUserModalOpen);

  constructor(private store: Store) {}
}
