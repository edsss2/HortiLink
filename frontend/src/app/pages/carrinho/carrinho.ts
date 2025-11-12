import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Navbar } from '../../components/navbar/navbar.component';
import { Footer } from "../../components/footer/footer.component";
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto-service';

@Component({
  selector: 'app-carrinho',
  imports: [Footer, Navbar],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {

  carrinho: number[] = [];
  carrinhoCount: number = 0;
  produtos: Produto[] = [];

  constructor(private usuarioService : UsuarioService, private produtoService : ProdutoService){}

  ngOnInit(): void {
      this.buscarCarrinho();
  }
  get usuarioLogado() {
    return this.usuarioService.getCurrentUser();
  }

  private buscarCarrinho() {
    return this.produtoService.getCarrinho(this.carrinho).subscribe(
      (resposta) => {
        this.produtos = resposta;
      },
      (erro) => {
        console.log("Ops, algo deu errado:", erro);
      }
    );
  }

}
