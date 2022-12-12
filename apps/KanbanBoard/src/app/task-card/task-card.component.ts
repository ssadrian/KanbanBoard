import {Component, Input, OnInit} from "@angular/core";

import {ITask} from "../models/task/itask"
import {IUser} from "../models/user/user";
import {TaskType} from "../models/task-type/task-type";
import {DeadlineType} from "../models/deadline-type";

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

    if (isDeadlineExceeded) {
      if (isTaskInFinishedBoard) {
        this.deadlineType = DeadlineType.FINISHED;
      } else {
        this.deadlineType = DeadlineType.MISSED;
      }
    } else if (isOneDayLeftUntilDeadline) {
      this.deadlineType = DeadlineType.CLOSE_BY;
    }
  }

  getDaysUntilDeadline(): number {
    let leftDays: number = -1;
    let today: Date = new Date();

    if (this.deadline === undefined) {
      return 0;
    }

    leftDays = Math.round(
      (this.deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return leftDays;
  }
}
