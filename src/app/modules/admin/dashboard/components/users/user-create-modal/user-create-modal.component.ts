import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../../core/models';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { selectIsCreateUserModalOpen } from '../../../../../../core/state/modal/modal.selectors';
import { closeCreateUserModal } from '../../../../../../core/state/modal/modal.actions';
import { AuthService } from '../../../../../../services/auth.service';
import { urlValidator } from './url-validator';
import { UserService } from '../../../../../../services/user.service';

@Component({
  selector: '[user-create-modal]',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create-modal.component.html',
})
export class UserCreateModalComponent {
  userForm: FormGroup;
  showCreateModal$ = this.store.select(selectIsCreateUserModalOpen);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store,
    private userService: UserService,
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: [''],
      role: ['Normal', Validators.required],
      phoneNumber: [''],
      imageUrl: ['', [urlValidator()]],
    });
  }

  // Function to handle form submission
  createUser(): void {
    if (this.userForm.valid) {
      this.authService.createUserAccount(this.userForm.value).subscribe({
        next: (user: User) => {
          console.log('User created successfully', user);
          this.closeModal();
          this.userService.userCreated(user); // Notify about the new user !!! VERY IMPORTANT- REFETCH THE TABLE
        },
        error: (error: Error) => {
          // Handle error
          console.error('Error creating user', error);
        },
      });
    } else {
      // If the form is invalid, iterate over the controls and log the errors
      Object.keys(this.userForm.controls).forEach((key) => {
        const control = this.userForm.get(key);
        const errors = control?.errors ?? {}; // Use nullish coalescing operator to default to an empty object if errors are null
        Object.keys(errors).forEach((keyError) => {
          console.log(`Form Invalid - control: ${key}, Error: ${keyError}, value: `, errors[keyError]);
        });
      });
    }
  }

  closeModal(): void {
    this.store.dispatch(closeCreateUserModal());
  }
}
