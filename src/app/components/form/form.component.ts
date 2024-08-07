import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task/task.service';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      date: ['', Validators.required],
      priority: ['', Validators.required],
      assignees: ['', Validators.required],
      file: [null]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      // Tratar o arquivo anexo
      if (this.taskForm.get('file')?.value) {
        const file = (this.taskForm.get('file')?.value as FileList)[0];
        taskData.file = file;
      }
      this.taskService.addTask(taskData);
      this.taskForm.reset();
    } else {
      // Marcar todos os campos como tocados para exibir as mensagens de erro
      this.taskForm.markAllAsTouched();
    }
  }

  // Método para tratar a seleção do arquivo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.taskForm.patchValue({
      file: file
    });
  }
}
