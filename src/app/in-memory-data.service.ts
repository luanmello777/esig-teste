import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, title: 'Task 1', details: 'Details of Task 1', date: '2024-08-01', priority: 'high', assignees: 'John Doe', status: 'done' },
      { id: 2, title: 'Task 2', details: 'Details of Task 2', date: '2024-08-02', priority: 'medium', assignees: 'Jane Doe', status: 'inProgress' },
      { id: 3, title: 'Task 3', details: 'Details of Task 3', date: '2024-08-03', priority: 'low', assignees: 'Jim Doe', status: 'pending' },
    ];
    return { tasks };
  }
}
