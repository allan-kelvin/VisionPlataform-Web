import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionCreateRequest } from '../models/version-create-request';
import { VersionResponse } from '../models/version-response';
import { VersionUpdateRequest } from '../models/version-update-request';

@Injectable({
  providedIn: 'root',
})
export class VersionService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl =
    'https://localhost:7293/api/Versions';


  // LISTAR

  getAll(days: number = 30): Observable<VersionResponse[]> {

    return this.http.get<VersionResponse[]>(
      `${this.apiUrl}?days=${days}`
    );

  }

  // BUSCAR POR ID

  getById(
    id: number
  ): Observable<VersionResponse> {

    return this.http.get<VersionResponse>(
      `${this.apiUrl}/${id}`
    );

  }


  // CRIAR

  create(
    data: VersionCreateRequest
  ): Observable<number> {

    return this.http.post<number>(
      this.apiUrl,
      data
    );

  }


  // ATUALIZAR

  update(
    id: number,
    data: VersionUpdateRequest
  ): Observable<void> {

    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      data
    );

  }


  // EXCLUIR

  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}
