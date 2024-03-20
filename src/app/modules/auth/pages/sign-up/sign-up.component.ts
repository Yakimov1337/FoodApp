import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from './must-match.validator';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  // Ensure you include all necessary imports if using standalone components
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, ButtonComponent],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'confirmPassword')
    };

    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, formOptions);
  }

  get form() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.authService.createUserAccount({ email, password }).subscribe({
        next: () => {
          this.authService.signInAccount(email, password).subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('SignIn Error:', error);
            },
          });
        },
        error: (error) => {
          console.error('SignUp Error:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
