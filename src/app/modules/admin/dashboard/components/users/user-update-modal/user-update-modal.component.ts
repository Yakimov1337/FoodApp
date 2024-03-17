import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../../core/models';
import { UserService } from '../../../../../../services/user.service';
import { selectIsUpdateUserModalOpen } from '../../../../../../core/state/modal/modal.selectors';
import { closeUpdateUserModal } from '../../../../../../core/state/modal/modal.actions';

@Component({
  selector: '[user-update-modal]',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-update-modal.component.html',
})
export class UserUpdateModalComponent {
  userForm: FormGroup;
  showUpdateModal$ = this.store.select(selectIsUpdateUserModalOpen);

  constructor(private fb: FormBuilder, private userService: UserService, private store: Store) {
    this.userForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['Normal', Validators.required],
      phoneNumber: [''],
      imageUrl: [''],
    });
  }

  // Function to handle form submission
  updateUser(): void {
    if (this.userForm.valid) {
      this.userService.updateUser('123', this.userForm.value).subscribe({
        next: (user: User) => {
          // Handle success (e.g., close modal, refresh list)
          console.log('User created successfully', user);
        },
        error: (error: Error) => {
          // Handle error
          console.error('Error creating user', error);
        },
      });
    }
  }

  closeModal(): void {
    this.store.dispatch(closeUpdateUserModal());
  }
}
