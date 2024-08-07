import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [ChartModule, FormsModule], // Adicione FormsModule aqui
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css'
})
export class GraficoComponent implements OnInit {
  data: any;
  options: any;
  allData: any;
  selectedDays: number = 15;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.updateChartData(this.selectedDays);
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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
    this.selectedDays = days;
    this.updateChartData(days);
  }

  updateChartData(days: number) {
    const endIndex = this.tasks.length;
    const startIndex = Math.max(endIndex - days, 0);
  
    const filteredTasks = this.tasks.slice(startIndex, endIndex);
  
    this.data = {
      labels: filteredTasks.map(task => task.date),
      datasets: [
        {
          label: 'Tarefas concluídas por dia',
          data: filteredTasks.map(task => task.status === 'done' ? 1 : 0),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        },
      ]
    };
  }
}