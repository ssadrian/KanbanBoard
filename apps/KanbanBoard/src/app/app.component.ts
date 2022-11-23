import { Component } from "@angular/core";
import { ITask } from "./models/task/itask";
import { TaskType } from "./models/task-type/task-type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title: string = "Kanban Board";

  #k_PENDIENTES_LISTA: string = TaskType.TODO;
  #k_PROGRESO_LISTA: string = TaskType.IN_PROGRESS;
  #k_FINALIZADAS_LISTA: string = TaskType.FINALIZED;

  taskTypes: TaskType[] = [];
  tasks: ITask[];

  constructor() {
    const tasksJson: string = `{
  "tareas": [
    {
      "lista": "${this.#k_FINALIZADAS_LISTA}",
      "img": "https://picsum.photos/300/200",
      "titulo": "Tarea 1: Diseño UI",
      "usuarios": [
        {
          "img": "https://picsum.photos/300/300",
          "alt": "Usuario"
        }
      ],
      "fechaFin": "2019-01-16"
    },
    {
      "lista": "${this.#k_PROGRESO_LISTA}",
      "img": "https://picsum.photos/300/200",
      "titulo": "Tarea 2: Diseño de todo el Backend",
      "usuarios": [],
      "fechaFin": "2022-11-09"
    },
    {
      "lista": "${this.#k_PENDIENTES_LISTA}",
      "img": null,
      "titulo": "Tarea 3: Diseño de la base de datos",
      "usuarios": [
        {
          "img": "https://picsum.photos/300/300",
          "alt": "Usuario"
        },
        {
          "img": "https://picsum.photos/300/300",
          "alt": "Usuario"
        }
      ],
      "fechaFin": "2022-11-16"
    },
    {
      "lista": "${this.#k_PENDIENTES_LISTA}",
      "img": null,
      "titulo": "Tarea 4: Implementar todo el Front-End",
      "usuarios": [],
      "fechaFin": null
    }
  ]
}`;

    this.tasks = JSON.parse(tasksJson)["tareas"];

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
}
