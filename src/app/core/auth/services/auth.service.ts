import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environmen.ts';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    `${environment.apiUrl}/Auth`;


  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(

        tap(response => {

          localStorage.setItem(
            'vision_token',
            response.token
          );

          localStorage.setItem(
            'vision_email',
            response.email
          );

          localStorage.setItem(
            'vision_role',
            response.role
          );

        })

      );
  }


  isAuthenticated(): boolean {

    const token =
      localStorage.getItem('vision_token');
    return !!token;
  }


  getToken(): string | null {

    return localStorage.getItem(
      'vision_token'
    );
  }


  logout(): void {

    localStorage.removeItem(
      'vision_token'
    );

    localStorage.removeItem(
      'vision_email'
    );

    localStorage.removeItem(
      'vision_role'
    );
  }
}
