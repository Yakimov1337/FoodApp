import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../../services/user.service';
import { selectDeleteUserId, selectIsDeleteUserModalOpen } from '../../../../../../core/state/modal/modal.selectors';
import { closeDeleteUserModal } from '../../../../../../core/state/modal/modal.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: '[user-delete-modal]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-delete-modal.component.html',
})
export class UserDeleteModalComponent {
  showDeleteModal$ = this.store.select(selectIsDeleteUserModalOpen);
  userIdToDelete: string | undefined | null = null;
  private subscription = new Subscription();

  constructor(private store: Store, private userService: UserService) {
    this.subscription.add(this.store.select(selectDeleteUserId).subscribe(userId => {
      this.userIdToDelete = userId;
    }));
  }
  ngOnInit(): void {
console.log(this.userIdToDelete)
  }

  deleteUser(): void {
    if (!this.userIdToDelete) {
      console.error('No user ID provided for deletion.');
      return;
    }
    this.userService.deleteUser(this.userIdToDelete).subscribe({
      next: () => {
        console.log(`User with ID ${this.userIdToDelete} deleted successfully.`);
        this.closeModal();
        this.userService.userDeleted(this.userIdToDelete);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }

  closeModal(): void {
    this.store.dispatch(closeDeleteUserModal());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
