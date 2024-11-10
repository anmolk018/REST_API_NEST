import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any) => {
        this.users = data?.length ? data : [];
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        alert(`Failed to load users.\n${error}`);
        console.error(error);
      }
    );
  }

  public logout(): void {
    this.authService.logout();
    console.log('Logged out');
  }
}
