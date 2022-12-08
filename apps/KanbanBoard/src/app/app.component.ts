import { Component } from "@angular/core";
import { FormBuilder } from '@angular/forms'

import { ITask } from "./models/task/itask";
import { TaskType } from "./models/task-type/task-type";
import { IUser } from "./models/user/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title: string = "Kanban Board";

  private k_PENDIENTES_LISTA: string = TaskType.TODO;
  private k_PROGRESO_LISTA: string = TaskType.IN_PROGRESS;
  private k_FINALIZADAS_LISTA: string = TaskType.FINALIZED;

  taskTypes: TaskType[] = [];

  tasks: ITask[];

  showTaskForm?: boolean;
  taskFormGroup = this.fb.group({
    title: [""],
    taskType: [TaskType.TODO],
    deadline: [new Date()],
    headerImage: ["https://lorempicsum.com/300/200"],
    users: []
  });

  constructor(private fb: FormBuilder) {
    const tareasJSON: string = `{
      "tareas": [{
        "id": 0,
        "lista": "${this.k_FINALIZADAS_LISTA}",
        "img": "https://picsum.photos/300/200",
        "titulo": "Tarea 1: Diseño UI",
        "usuarios": [{
          "email": "lponts@ilerna.com",
          "img": "https://picsum.photos/300/300",
          "nick": "Juan",
          "alt": "Usuario"
        }],
        "fechaFin": "2019-01-16"
      },
      {
        "id": 1,
        "lista": "${this.k_PROGRESO_LISTA}",
        "img": "https://picsum.photos/300/200",
        "titulo": "Tarea 2: Diseño de todo el Backend",
        "usuarios": [],
        "fechaFin": "2022-11-09"
      },
      {
        "id": 2,
        "lista": "${this.k_PENDIENTES_LISTA}",
        "img": null,
        "titulo": "Tarea 3: Diseño de la base de datos",
        "usuarios":
        [
          {
            "email": "jdominguez@ilerna.com",
            "img": "https://picsum.photos/200/200",
            "nick": "Jose",
            "alt": "Usuario"
          },
          {
            "email": "lponts@ilerna.com",
            "img": "https://picsum.photos/100/100",
            "nick": "Laura",
            "alt": "Usuario"
          }
        ],
        "fechaFin": "2022-11-16"
      },
      {
        "id": 3,
        "lista": "${this.k_PENDIENTES_LISTA}",
        "img": null,
        "titulo": "Tarea 4: Implementar todo el Front-End",
        "usuarios": [],
        "fechaFin": null
      }
    ]}`;

    this.tasks = JSON.parse(tareasJSON)["tareas"];

    this.tasks.forEach((task) => {
      task.fechaFin = new Date(task.fechaFin?.toString() ?? "");

      // Invalid dates are marked with 'Invalid date' on console.log
      if (isNaN(task.fechaFin.getDate())) {
        task.fechaFin = undefined;
      }
    });

    this.taskTypes.push(TaskType.TODO);
    this.taskTypes.push(TaskType.IN_PROGRESS);
    this.taskTypes.push(TaskType.FINALIZED);
  }

  getTasksOfType(taskType: TaskType): ITask[] {
    let tasks: ITask[] = [];

    for (let task of this.tasks) {
      if (task.lista !== taskType) {
        continue;
      }

      tasks.push(task);
    }

    return tasks;
  }

  toggleTaskForm(): void {
    this.showTaskForm = !this.showTaskForm;
  }

  addNewUserToTask(task: ITask): void {
    task.usuarios.push({
      img: "https://picsum.photos/200/300",
      alt: "",
      email: "",
      nick: "",
    });
  }

  removeUserFromTask(userToRemove: IUser, task: ITask): void {
    for (let user of task.usuarios) {
      if (
        user.nick === userToRemove.nick &&
        user.email === userToRemove.email
      ) {
        task.usuarios.splice(task.usuarios.indexOf(user), 1);
      }
    }
  }

  startTaskEdit(task: ITask) {
    this.toggleTaskForm();
    this.taskFormGroup.patchValue({
      title: task.titulo,
      taskType: task.lista,
      deadline: task.fechaFin,
      headerImage: task.img
    });
  }

  startEmptyTaskEdit() {
    this.toggleTaskForm();
    this.taskFormGroup.reset();
  }

  saveNewTask() {
    this.toggleTaskForm();
    this.tasks.push({
      id: 0,
      titulo: this.taskFormGroup.value.title!,
      lista: this.taskFormGroup.value.taskType!,
      img: this.taskFormGroup.value.headerImage!,
      fechaFin: this.taskFormGroup.value.deadline!,
      usuarios: this.taskFormGroup.value.users!
    });

    console.log(this.tasks.pop());
  }
}
