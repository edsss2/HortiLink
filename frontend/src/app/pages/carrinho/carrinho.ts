import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Navbar } from '../../components/navbar/navbar.component';
import { Footer } from "../../components/footer/footer.component";
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto-service';
import { FarmerIcon } from '../../icons/farmer-icon/farmer-icon';
import { RouterLink } from "@angular/router";
import { CarrinhoService } from '../../services/carrinho-service';

@Component({
  selector: 'app-carrinho',
  imports: [Footer, Navbar, FarmerIcon, RouterLink],
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

  produtos: Produto[] = [
  {
    id: 1,
    nome: 'Tomate Cereja Orgânico',
    nomeComercio: 'Fazenda Sol Nascente',
    valor: '8,50',
    promocao: '7,99', // Deixe vazio "" se não houver promoção
    organico: true,
    unidadeMedida: 'Bandeja',
    tipoVendedor: 'Comercio',

    imagemUrl: '/assets/bgHortlink.png'
  },
  {
    id: 2,
    nome: 'Alface Crespa Hidropônica',
    nomeComercio: 'Verde Vale Hortaliças',
    valor: '3,50',
    promocao: '', // Sem promoção
    organico: false,
        unidadeMedida: 'Un',
        tipoVendedor: 'Produtor',
       imagemUrl: '/assets/bgHortlink.png'
  },
  {
    id: 3,
    nome: 'Cenoura',
    nomeComercio: 'Sítio Terra Boa',
    valor: '4,00',
    promocao: '3,49',
    organico: false,
        unidadeMedida: 'g',
              tipoVendedor: 'Produtor',
    imagemUrl: '/assets/bgHortlink.png'
  },
  {
    id: 4,
    nome: 'Maçã Fuji',
    nomeComercio: 'Pomar Irmãos Silva',
    valor: '1,50',
    promocao: '',
    organico: true,
        unidadeMedida: 'Un',
              tipoVendedor: 'Produtor',
        imagemUrl: '/assets/bgHortlink.png'
  }
];

}
