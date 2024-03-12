import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { account } from '../../../../core/lib/appwrite';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  async onSubmit() {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    try {
      // Use the existing Appwrite account instance to create an email session
      await account.createEmailSession(email, password);

      // If successful, navigate to the dashboard or home page
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, e.g., show an error message to the user
    }
  }
}
