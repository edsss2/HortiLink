export interface VendasPorDia {
  data: string;
  total: number;
}

// Interface para a lista de produtos
export interface ProdutoMaisVendido {
  nomeProduto: string;
  quantidadeVendida: number;
}

// A interface principal do Dashboard
export interface DashboardDTO {
  faturamentoMes: number;
  pedidosMes: number;
  pedidosPendentes: number;
  ticketMedio: number;
  vendasUltimos7Dias: VendasPorDia[];
  top5Produtos: ProdutoMaisVendido[];
}