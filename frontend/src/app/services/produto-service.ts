import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/oferta`

  constructor(private http: HttpClient){}

  getTodos() : Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/listar`);
  }
}
