import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../../core/models';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { closeCreateUserModal } from '../../../../../../core/state/modal/user/modal.actions';
import { AuthService } from '../../../../../../services/auth.service';
import { UserService } from '../../../../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { urlFormValidator } from '../../../../../../shared/validators/url-validator';

@Component({
  selector: '[user-create-modal]',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create-modal.component.html',
})
export class UserCreateModalComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: [''],
      role: ['Normal', Validators.required],
      phoneNumber: ['',Validators.pattern(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/)],
      imageUrl: [''],
    });
  }

  // Function to handle form submission
  createUser(): void {
    if (this.userForm.valid) {
      this.authService.createUserAccount(this.userForm.value).subscribe({
        next: (user: User) => {
          this.closeModal();
          this.resetForm(); // Reset form to default state after creation
          // This will be called only after the user is saved because of switchmap in auth service
          this.userService.userCreated(user); // Notify about the new user !!! VERY IMPORTANT- REFETCH THE TABLE
          this.toastr.success('User created successfully!');
        },
        error: (error: any) => {
          let errorMessage = 'Error creating user!';
          if (error.response && error.response.code === 409) {
            errorMessage = 'Email already exists. Please use a different email!';
          } else if (error.message) {
            errorMessage = error.message;
          }
          this.toastr.error(errorMessage);
        },
      });
    } else {
      this.userForm.markAllAsTouched();
      // If the form is invalid, iterate over the controls and log the errors
      Object.keys(this.userForm.controls).forEach((key) => {
        const control = this.userForm.get(key);
        const errors = control?.errors ?? {}; // Use nullish coalescing operator to default to an empty object if errors are null
        Object.keys(errors).forEach((keyError) => {
          this.toastr.error(`Form Invalid - control: ${key}, Error: ${keyError}`);
        });
      });
    }
  }

  closeModal(): void {
    this.store.dispatch(closeCreateUserModal());
  }

  resetForm(): void {
    this.userForm.reset({
      email: [''],
      password: [''],
      name: [''],
      role: ['Normal'],
      phoneNumber: [''],
      imageUrl: [''],
    });
  }
}
