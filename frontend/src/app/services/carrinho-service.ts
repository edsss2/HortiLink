import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  constructor() { }

  private produtosCarrinho: Produto[] = [];

  private carrinhoSubject = new BehaviorSubject<Produto[]>(this.produtosCarrinho);

  carrinho$ = this.carrinhoSubject.asObservable();

  getCarrinho(): Produto[] {
    return this.produtosCarrinho;
  }

  adicionarProduto(produto: Produto) {
    produto.qtdCarrinho = 1;
    if (this.produtosCarrinho.find(p => p.id === produto.id)) {
      return;
    }
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

  incrementarQuantidade(id: number) {
    const produto: Produto = this.produtosCarrinho.find(p => p.id === id)!;
    if (!produto) {
      console.warn(`Produto ${id} não existe no carrinho.`);
      return;
    }

    const qtdAtual = produto.qtdCarrinho ?? 1;
    if (produto.qtdDisponivel > qtdAtual) {
      produto.qtdCarrinho = qtdAtual + 1;
    } else {
      alert(`Estoque máximo atingido para ${produto.nome}`);
    }
  }

  decrementarQuantidade(id: number) {
    const produto: Produto = this.produtosCarrinho.find(p => p.id === id)!;
    if (!produto) {
      console.warn(`Produto ${id} não existe no carrinho.`);
      return;
    }
    const qtdAtual = produto.qtdCarrinho ?? 1;
    if (qtdAtual > 1) {
      produto.qtdCarrinho = qtdAtual - 1;
    } else {
      return;
    }

  }

  calcularSubtotal(produto: Produto): number {
    const precoString = produto.valor;
    const precoStringCorrigida = precoString.replace(",", ".");
  
    // Agora sim, faça o parse com a string correta (ex: "8.50")
    const preco = parseFloat(precoStringCorrigida);
    const quantidade = produto.qtdCarrinho ?? 0;

    return preco * quantidade;
  }
 
  calcularTotal(): number {
    return this.produtosCarrinho.reduce((total, produto) => {
      return total + this.calcularSubtotal(produto);
    }, 0);
  }


}
