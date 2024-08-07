import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      date: ['', Validators.required],
      priority: ['', Validators.required],
      assignees: ['', Validators.required],
      status: ['pending', Validators.required],
      file: [null]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value as Task;
      this.taskService.addTask(taskData).subscribe(() => {
        this.taskForm.reset();
        // Atualize a lista de tarefas ou qualquer outra ação necessária
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.taskForm.patchValue({
      file: file
    });
  }
}