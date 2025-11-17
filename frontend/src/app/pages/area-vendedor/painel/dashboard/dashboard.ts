import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para @if, @for, etc.

// 1. Importe os componentes do PrimeNG
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table'; // Para a lista de produto

import { DashboardDTO } from '../../../../models/dto/dashboard.dto';
import { DASHBOARD_MOCK_DATA } from '../../../../models/dto/dashboard.mock';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CardModule, ChartModule, TableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  public dados: DashboardDTO = DASHBOARD_MOCK_DATA; // Carrega os dados mockados
  public isLoading = false; // (Você pode mudar para true quando carregar da API)

  // Variáveis para o gráfico
  public chartData: any;
  public chartOptions: any;

  ngOnInit(): void {
    // 4. Chame o método para configurar os dados do gráfico
    this.configurarGrafico();
  }

  configurarGrafico(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const corDeFundo = 'rgba(74, 168, 79, 0.4)';
    const corDaBorda = 'rgb(74, 168, 79)';
    
    // Pega os dados mockados e transforma no formato que o Chart.js espera
    const labels = this.dados.vendasUltimos7Dias.map(v => v.data);
    const data = this.dados.vendasUltimos7Dias.map(v => v.total);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Faturamento Diário',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)', 
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }
      ]
    };
    
    // Configurações visuais (opcional)
    this.chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }

}
