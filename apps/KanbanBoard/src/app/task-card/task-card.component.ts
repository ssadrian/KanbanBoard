import { Component, Input, OnInit } from "@angular/core";
import { IUser } from "../models/user/user";
import { TaskType } from "../models/task-type/task-type";

@Component({
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class TaskCardComponent implements OnInit {
  @Input() title?: string;
  @Input() deadline?: string;
  @Input() image?: string;
  @Input() assignedUsers?: IUser[];

  @Input() taskType?: TaskType;

  isFinished?: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.isFinished = this.getDaysUntilDeadline() >= 0;
  }

  getDaysUntilDeadline(): number {
    let leftDays: number = -1;
    let today: Date = new Date();
    let deadline: Date = new Date(Date.parse(this.deadline ?? ""));

    // BUG: Diff between 2019 and 2022 should be negative and diff between 2022 and 2023 should be positive
    leftDays = Math.round((today.getTime() - deadline.getTime()) / (1000 * 60 * 60 * 24)) - 1;
    return leftDays;
  }
}
