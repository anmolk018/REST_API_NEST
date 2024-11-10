
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      organization: ['']
    });
  }

  public onSubmit(): void {
    const formData = { ...this.signupForm.value };
    if (formData.organization?.trim() === '') {
      delete formData.organization;
    }
    this.authService.signUp(formData)
      .subscribe({
        next: () => {
          alert('Sign Up successful');
          this.router.navigate(['/signin'])
        },
        error: (error: Error) => {
          console.error('Signup failed:', error);
          alert(`Signup failed.\n${error}`);
        }
      });
  }
}

