import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  standalone: true,
  imports: [FormsModule, RouterLink, AngularSvgIconModule, ButtonComponent, ReactiveFormsModule],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      },
    );
  }

  get form() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.authService
        .createUserAccount({ email, password })
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.error('SignUp Error:', error);
        });
    } else {
      console.error('Form is invalid');
      Object.keys(this.signUpForm.controls).forEach((key) => {
        const controlErrors = this.signUpForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }
  }
}
