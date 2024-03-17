import { Component } from '@angular/core';
import { UsersTableComponent } from '../../components/users/users-table/users-table.component';
import { UserCreateModalComponent } from '../../components/users/user-create-modal/user-create-modal.component';
import { UserDeleteModalComponent } from '../../components/users/user-delete-modal/user-delete-modal.component';
import { UserUpdateModalComponent } from '../../components/users/user-update-modal/user-update-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersTableComponent, UserCreateModalComponent, UserDeleteModalComponent, UserUpdateModalComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  constructor() {}
}
