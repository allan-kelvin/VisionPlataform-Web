import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientCreateRequest } from './models/ClientCreateRequest.interface';
import { ClientResponse } from './models/ClientResponse.interface';
import { ClientUpdateRequest } from './models/ClientUpdateRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private readonly http = inject(HttpClient);

  // API

  private readonly apiUrl = 'https://localhost:7293/api/Clientes';
  // LISTAR


  getAll(): Observable<ClientResponse[]> {

    return this.http.get<ClientResponse[]>(
      this.apiUrl
    );

  }

  // BUSCAR POR ID
  getById(id: number): Observable<ClientResponse> {

    return this.http.get<ClientResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  // CRIAR
  create(
    data: ClientCreateRequest
  ): Observable<ClientResponse> {

    return this.http.post<ClientResponse>(
      this.apiUrl,
      data
    );

  }

  // ATUALIZAR
  update(
    id: number,
    data: ClientUpdateRequest
  ): Observable<ClientResponse> {

    return this.http.put<ClientResponse>(
      `${this.apiUrl}/${id}`,
      data
    );

  }

  // EXCLUIR
  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


}
