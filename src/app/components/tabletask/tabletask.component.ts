import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-tabletask',
  standalone: true,
  imports: [],
  templateUrl: './tabletask.component.html',
  styleUrls: ['./tabletask.component.css']
})
export class TabletaskComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter = {
    status: '',
    priority: '',
    date: ''
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredTasks = this.tasks.filter(task => {
      return (!this.filter.status || task.status === this.filter.status) &&
             (!this.filter.priority || task.priority === this.filter.priority) &&
             (!this.filter.date || task.date === this.filter.date);
    });
  }
}
