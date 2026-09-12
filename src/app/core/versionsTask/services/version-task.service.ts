import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionTaskResponse } from '../models/version-task-response';

@Injectable({
  providedIn: 'root',
})
export class VersionTaskService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://localhost:7293/api/VersionTasks';


  // ==========================================
  // LISTAR TAREFAS POR VERSÃO
  // ==========================================

  getByVersionId(
    versionId: number
  ): Observable<VersionTaskResponse[]> {

    return this.http.get<VersionTaskResponse[]>(
      `${this.apiUrl}/by-version/${versionId}`
    );

  }


  // ==========================================
  // CRIAR TAREFA
  // FUTURAMENTE SERÁ USADO PELO MODAL
  // ==========================================

  create(data: any): Observable<number> {

    return this.http.post<number>(
      this.apiUrl,
      data
    );

  }


  // ==========================================
  // ATUALIZAR TAREFA
  // ==========================================

  update(
    id: number,
    data: any
  ): Observable<void> {

    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      data
    );

  }


  // ==========================================
  // EXCLUIR TAREFA
  // ==========================================

  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


  // ==========================================
  // MARCAR MERGE
  // ==========================================

  markMerge(
    id: number
  ): Observable<void> {

    return this.http.post<void>(
      `${this.apiUrl}/${id}/merge`,
      {}
    );

  }


  // ==========================================
  // ATRIBUIR QA
  // ==========================================

  assignQa(
    id: number,
    qaUserId: number
  ): Observable<void> {

    return this.http.post<void>(
      `${this.apiUrl}/${id}/assign-qa/${qaUserId}`,
      {}
    );

  }
}
