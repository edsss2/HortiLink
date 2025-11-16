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

  // Esta é a sua lista de produtos mocados
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
      qtdDisponivel: 20,

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
      qtdDisponivel: 34,

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
      qtdDisponivel: 11,

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
      qtdDisponivel: 2,
      imagemUrl: '/assets/bgHortlink.png'
    }
  ];
}
