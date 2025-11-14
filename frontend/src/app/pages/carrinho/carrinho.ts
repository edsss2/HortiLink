import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Navbar } from '../../components/navbar/navbar.component';
import { Footer } from "../../components/footer/footer.component";
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto-service';
import { FarmerIcon } from '../../icons/farmer-icon/farmer-icon';
import { RouterLink } from "@angular/router";
import { CarrinhoService } from '../../services/carrinho-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrinho',
  imports: [Footer, Navbar, FarmerIcon, RouterLink, CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  constructor(private usuarioService : UsuarioService, private carrinhoService : CarrinhoService){}

    ngOnInit(): void {
      this.carrinhoService.carrinho$.subscribe((itens) => {
        this.produtos = itens;
      });
    } 

  get usuarioLogado() {
    return this.usuarioService.getCurrentUser();
  }


  public removerDoCarrinho(id: number) {
    this.carrinhoService.removerProduto(id);
  }

  public limparCarrinho() {
    this.carrinhoService.limparCarrinho();
  }

  public adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarProduto(produto);
  }

  public incrementarQtd(id: number) {
    this.carrinhoService.incrementarQuantidade(id);
  }

  public decrementarQtd(id: number) {
    this.carrinhoService.decrementarQuantidade(id);
  }

  public calcularSubtotal(produto: Produto): number {
    return this.carrinhoService.calcularSubtotal(produto);
  } 

  public calcularTotal(): number {
    return this.carrinhoService.calcularTotal();
  }

  public finalizarCompra() {
    alert("Compra finalizada!");
  }

  produtos: Produto[] = [];

}
