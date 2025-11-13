import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  constructor(){}

  private produtosCarrinho: Produto[] = [];

  private carrinhoSubject = new BehaviorSubject<Produto[]>(this.produtosCarrinho);

  carrinho$ = this.carrinhoSubject.asObservable();

  getCarrinho(): Produto[] {
    return this.produtosCarrinho;
  }

  adicionarProduto(produto: Produto) {
    this.produtosCarrinho.push(produto);
    this.carrinhoSubject.next(this.produtosCarrinho);
  }

  removerProduto(id: number) {
    this.produtosCarrinho = this.produtosCarrinho.filter(p => p.id !== id);
    this.carrinhoSubject.next(this.produtosCarrinho);
  }

  limparCarrinho() {
    this.produtosCarrinho = [];
    this.carrinhoSubject.next(this.produtosCarrinho);
  }

  getQuantidade(): number {
    return this.produtosCarrinho.length;
  }
}
