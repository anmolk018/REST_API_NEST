import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  public signIn(credentials: { email: string; password: string }): Observable<any> {
    console.log(credentials)
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.isAuthenticated = true;
      }),
      catchError(err => {
        this.isAuthenticated = false;
        return throwError(() => new Error(this.errorMessageFormatter(err)));
      })
    );
  }

  public signUp(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, userData).pipe(
      catchError(err => {
        return throwError(() => new Error(this.errorMessageFormatter(err)));
      })
    );
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated && !!localStorage.getItem('accessToken');
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.isAuthenticated = false;
    this.router.navigate(['/signin']);
  }

  public getUsers(): Observable<any[]> {
    const accessToken = this.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/dashboard/users`, { headers }).pipe(
      tap((response: any) => {
        return response
      }),
      catchError(err => {
        return throwError(() => new Error(this.errorMessageFormatter(err)));
      })
    )
  }

  private errorMessageFormatter(err: any) {
    return Array.isArray(err?.error?.message)
      ? err.error.message.join(" AND ")
      : typeof err?.error?.message === 'string'
        ? err.error.message
        : "Something went wrong";
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

}







