import {Component} from '@angular/core';
import { FormComponent } from '../form/form.component';



@Component({
  selector: 'app-task',
  imports: [FormComponent],
  standalone: true,
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TaskComponent {

}