import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms'; // Import FormsModule para ngModel

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ChartModule, FormsModule], // Adicione FormsModule aqui
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  data: any;
  options: any;
  allData: any;
  selectedDays: number = 15; // Propriedade para armazenar o valor selecionado
  
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
    this.allData = {
      labels: this.generateLast60DaysLabels(),
      datasets: [
        {
          label: 'Tarefas concluídas por dia',
          data: this.generateRandomData(60), // Gera dados aleatórios para 60 dias
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
      ]
    };
  
    this.updateChartData(this.selectedDays);
  
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
  
  onDateFilterChange(days: number) {
    this.updateChartData(days);
  }
  
  updateChartData(days: number) {
    const endIndex = this.allData.labels.length;
    const startIndex = Math.max(endIndex - days, 0);
  
    this.data = {
      labels: this.allData.labels.slice(startIndex, endIndex),
      datasets: [
        {
          label: this.allData.datasets[0].label,
          data: this.allData.datasets[0].data.slice(startIndex, endIndex),
          fill: false,
          borderColor: this.allData.datasets[0].borderColor,
          tension: 0.4
        },
      ]
    };
  }
  
  generateLast60DaysLabels(): string[] {
    const labels: string[] = [];
    const today = new Date();
  
    for (let i = 59; i >= 0; i--) {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - i);
      const day = String(pastDate.getDate()).padStart(2, '0');
      const month = String(pastDate.getMonth() + 1).padStart(2, '0');
      labels.push(`${day}/${month}`);
    }
  
    return labels;
  }
  
  generateRandomData(days: number): number[] {
    const data: number[] = [];
    for (let i = 0; i < days; i++) {
      data.push(Math.floor(Math.random() * 100)); // Gera dados aleatórios entre 0 e 100
    }
    return data;
  }
}