import { Component } from '@angular/core';

import { User } from '../../../../../core/models';
import { UserService } from '../../../../../services/user.service';
import { UsersTableComponent } from '../../components/users/users-table/users-table.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  public users: User[] = [];
  public isLoading: boolean = true;

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    try {
      // Call getAllUsers() from the Users service
      this.users = await this.userService.getAllUsers();
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching Users:', error);
      this.isLoading = false;
    }
  }
}
