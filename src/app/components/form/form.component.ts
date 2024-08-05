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
      labels: ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06', '07/06', '08/06', '09/06', '10/06', '11/06', '12/06', '13/06', '14/06', '15/06'],
      datasets: [
        {
          label: 'Tarefas concluídas por dia',
          data: [5, 10, 15, 20, 25, 10, 35, 40, 45, 25, 39, 50, 45, 70],
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
}
