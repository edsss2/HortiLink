import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario.model';
import { Footer } from "../../components/footer/footer.component";
import { Produto } from '../../models/produto.model';
import { FarmerIcon } from '../../icons/farmer-icon/farmer-icon';
import { ProdutoService } from '../../services/produto-service';
import { CarrinhoService } from '../../services/carrinho-service';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, FarmerIcon],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  produtos: Produto[] = [];
  constructor(private usuarioService: UsuarioService, private produtoService: ProdutoService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  get usuarioLogado() {
    return this.usuarioService.getCurrentUser();
  }

  private buscarProdutos() {
    this.produtoService.getTodos().subscribe(
      (resposta) => {
        this.produtos = resposta;
      },
      (erro) => {
        console.log("Ops, algo deu errado:", erro);
      }
    );
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarProduto(produto);
  }

 
}
