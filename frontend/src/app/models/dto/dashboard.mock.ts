import { DashboardDTO } from './dashboard.dto';

// Nossos dados de teste
export const DASHBOARD_MOCK_DATA: DashboardDTO = {
  faturamentoMes: 12850.75,
  pedidosMes: 215,
  pedidosPendentes: 8,
  ticketMedio: 59.77,
  vendasUltimos7Dias: [
    { data: '10/11', total: 1200 },
    { data: '11/11', total: 1500 },
    { data: '12/11', total: 950 },
    { data: '13/11', total: 1800 },
    { data: '14/11', total: 1300 },
    { data: '15/11', total: 2100 },
    { data: '16/11', total: 2300 }
  ],
  top5Produtos: [
    { nomeProduto: 'Tomate Italiano', quantidadeVendida: 150 },
    { nomeProduto: 'Alface Crespa (un)', quantidadeVendida: 120 },
    { nomeProduto: 'Banana Prata (kg)', quantidadeVendida: 95 },
    { nomeProduto: 'Laranja Pera (kg)', quantidadeVendida: 80 },
    { nomeProduto: 'Batata Lavada (kg)', quantidadeVendida: 75 }
  ]
};