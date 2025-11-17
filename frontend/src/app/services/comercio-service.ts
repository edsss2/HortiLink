import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comercio } from '../models/comercioData';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {
  private apiUrl = `${environment.apiUrl}/comercio`;

  constructor(private http: HttpClient) {}

    salvarProduto(produto: Comercio): Observable<any> {
        return this.http.post(`${this.apiUrl}/salvar`, produto);
      }
}
