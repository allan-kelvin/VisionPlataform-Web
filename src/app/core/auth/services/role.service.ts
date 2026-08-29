import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://localhost:7293/api/Role';

  getAll(): Observable<Role[]> {

    return this.http.get<Role[]>(this.apiUrl);

  }
}
