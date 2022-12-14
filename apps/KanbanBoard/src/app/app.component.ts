import {Component} from "@angular/core";

import {ITask} from "./models/itask";
import {TaskType} from "./models/task-type";

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

  showTaskForm: boolean = false;
  taskForm?: ITask;

  constructor() {
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

  startTaskEdit(task: ITask): void {
    this.toggleTaskForm();
    this.taskForm = {
      id: task.id,
      titulo: task.titulo,
      lista: task.lista,
      fechaFin: task.fechaFin,
      img: task.img,
      usuarios: task.usuarios,
    };
  }

  startTaskEditOfType(taskType: TaskType): void {
    this.toggleTaskForm();
    this.taskForm = {
      id: -1,
      titulo: "",
      lista: taskType,
      fechaFin: new Date(),
      img: "https://picsum.photos/200/300",
      usuarios: [],
    };
  }

  updateTaskWithId(id: number, newTaskValues: ITask): void {
    let taskToUpdate: ITask = this.tasks.find((task: ITask): boolean => task.id == id)!;

    taskToUpdate.titulo = newTaskValues.titulo!;
    taskToUpdate.lista = newTaskValues.lista!;
    taskToUpdate.img = newTaskValues.img!;
    taskToUpdate.fechaFin = newTaskValues.fechaFin!;
    taskToUpdate.usuarios = newTaskValues.usuarios!;
  }

  saveTask(task: ITask): void {
    this.toggleTaskForm();

    if (this.tasks.find((x: ITask): boolean => x.id == task.id)) {
      this.updateTaskWithId(task.id, task);
      return;
    }

    this.tasks.push(task);
  }
}
