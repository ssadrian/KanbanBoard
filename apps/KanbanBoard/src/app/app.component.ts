import {Component} from "@angular/core";
import {ITask} from "./models/task/itask";
import {TaskType} from "./models/task-type/task-type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title: string = "Kanban Board";

  taskTypes: TaskType[] = [];
  tasks: ITask[];

  constructor() {
    const tasksJson: string = `[
        {
          "taskType": "${(TaskType.FINALIZED)}",
          "img": "https://picsum.photos/300/200",
          "title": "Tarea 1: Diseño UI",
          "users": [{
            "img": "https://picsum.photos/300/300",
            "alt": "Usuario"
          }],
          "deadline": "2019-01-16"
        },
        {
          "taskType": "${(TaskType.IN_PROGRESS)}",
          "img": "https://picsum.photos/300/200",
          "title": "Tarea 2: Diseño de todo el Backend",
          "users": [],
          "deadline": "2022-11-09"
        },
        {
          "taskType": "${(TaskType.TODO)}",
          "img": null,
          "title": "Tarea 3: Diseño de la base de datos",
          "users":[{
            "img": "https://picsum.photos/300/300",
            "alt": "Usuario"
          },
          {
            "img": "https://picsum.photos/300/300",
            "alt": "Usuario"
          }],
          "deadline": "2022-11-16"
        },
        {
          "taskType": "${(TaskType.TODO)}",
          "img": null,
          "title": "Tarea 4: Implementar todo el Front-End",
          "users": [],
          "deadline": null
        }
      ]`;

    this.tasks = JSON.parse(tasksJson);

    this.taskTypes.push(TaskType.TODO);
    this.taskTypes.push(TaskType.IN_PROGRESS);
    this.taskTypes.push(TaskType.FINALIZED);
  }

  getTasksOfType(taskType: TaskType): ITask[] {
    let tasks: ITask[] = [];

    for (let task of this.tasks) {
      if (task.taskType !== taskType) {
        continue;
      }

      tasks.push(task);
    }

    return tasks;
  }
}