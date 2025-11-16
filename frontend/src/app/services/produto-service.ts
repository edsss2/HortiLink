import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProdutoData } from '../models/produtoData.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/oferta`

  constructor(private http: HttpClient){}

  getTodos() : Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/listar`);
  }

  getCarrinho(ids : number[]) : Observable<Produto[]> {
    return this.http.post<Produto[]>(`${this.apiUrl}/carrinho`, ids);
  }

  salvarProduto(produto: ProdutoData, imagemPrincipal: File | null, imagensAdicionais: File[]): Observable<any> {
    const formData = new FormData();

    const produtoPayload = {
      ...produto,
      
      dataColheita: this.formatarParaLocalDate(produto.dataColheita) 
    };
    
    formData.append('produto', new Blob([JSON.stringify(produtoPayload)], {
      type: 'application/json'
    }));

    if (imagemPrincipal) {
      formData.append('imagemPrincipal', imagemPrincipal, imagemPrincipal.name);
    }
    imagensAdicionais.forEach((file) => {
      if (file) {
        formData.append('imagensAdicionais', file, file.name);
      }
    });

    return this.http.post(`${this.apiUrl}/salvar`, formData);
  }

  private formatarParaLocalDate(data: Date | string | null): string | null {
    if (!data) {
      return null;
    }
    
    const dataObj = new Date(data);
    const dataLocal = new Date(dataObj.getTime() + dataObj.getTimezoneOffset() * 60000);
    
    return dataLocal.toISOString().split('T')[0];
  }
}
