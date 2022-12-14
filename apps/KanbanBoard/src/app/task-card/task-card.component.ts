import { Component, Input, OnInit } from "@angular/core";

import { ITask } from "../models/itask";
import { IUser } from "../models/iuser";
import { TaskType } from "../models/task-type";
import { DeadlineType } from "../models/deadline-type";

@Component({
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"],
})
export class TaskCardComponent implements OnInit {
  @Input() task?: ITask;
  @Input() title?: string;

  deadline?: Date;
  image?: string;
  assignedUsers?: IUser[];
  taskType?: TaskType;

  deadlineType?: DeadlineType;

  constructor() {
    this.deadlineType = DeadlineType.DEFAULT;
  }

  ngOnInit(): void {
    if (this.task) {
      this.title = this.task.titulo;
    }

    this.deadline = this.task?.fechaFin;
    this.image = this.task?.img;
    this.assignedUsers = this.task?.usuarios;
    this.taskType = this.task?.lista;

    let daysUntilDeadline: number = this.getDaysUntilDeadline();

    let isDeadlineExceeded: boolean = daysUntilDeadline <= 0;
    let isTaskInFinishedBoard: boolean = this.taskType == TaskType.FINALIZED;
    let isOneDayLeftUntilDeadline: boolean = daysUntilDeadline == 1;

    if (isDeadlineExceeded && !isTaskInFinishedBoard) {
      this.deadlineType = DeadlineType.MISSED;
    } else if (isOneDayLeftUntilDeadline) {
      this.deadlineType = DeadlineType.CLOSE_BY;
    } else if (isTaskInFinishedBoard) {
      this.deadlineType = DeadlineType.FINISHED;
    }
  }

  getDaysUntilDeadline(): number {
    if (this.deadline === undefined) {
      return 0;
    }

    let today: Date = new Date();
    let leftDays: number = Math.ceil(
      (this.deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    return leftDays;
  }
}
