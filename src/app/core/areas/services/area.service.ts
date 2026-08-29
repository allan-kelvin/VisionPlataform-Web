import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaCreateRequest } from '../models/area-create-request';
import { AreaResponse } from '../models/area-response';
import { AreaUpdateRequest } from '../models/area-update-request';

@Injectable({
  providedIn: 'root',
})
export class AreaService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://localhost:7293/api/Areas';


  // =========================================================
  // LISTAR
  // =========================================================

  getAll(): Observable<AreaResponse[]> {

    return this.http.get<AreaResponse[]>(
      this.apiUrl
    );

  }


  // =========================================================
  // BUSCAR POR ID
  // =========================================================

  getById(id: number): Observable<AreaResponse> {

    return this.http.get<AreaResponse>(
      `${this.apiUrl}/${id}`
    );

  }


  // =========================================================
  // CRIAR
  // =========================================================

  create(
    data: AreaCreateRequest
  ): Observable<AreaResponse> {

    return this.http.post<AreaResponse>(
      this.apiUrl,
      data
    );

  }


  // =========================================================
  // ATUALIZAR
  // =========================================================

  update(
    id: number,
    data: AreaUpdateRequest
  ): Observable<AreaResponse> {

    return this.http.put<AreaResponse>(
      `${this.apiUrl}/${id}`,
      data
    );

  }


  // =========================================================
  // EXCLUIR
  // =========================================================

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}
