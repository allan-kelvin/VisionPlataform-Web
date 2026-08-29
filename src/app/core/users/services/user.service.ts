import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environmen.ts.js';
import { UserResponse } from '../models/user-response.js';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/Users`;


  create(data: {
    nome: string;
    email: string;
    senha: string;
    roleId: number;
  }) {
    return this.http.post<number>(
      `${this.apiUrl}`,
      data
    );
  }

  getAll(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<UserResponse> {

    return this.http.get<UserResponse>(
      `${this.apiUrl}/${id}`
    );
  }

  update(
    id: number,
    data: {
      nome: string;
      roleId: number;
      ativo: boolean;
    }
  ) {

    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      data
    );

  }


  delete(id: number) {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }
}
