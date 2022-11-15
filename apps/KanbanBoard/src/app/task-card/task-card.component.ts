import {Component, Input, OnInit} from "@angular/core";
import {IUser} from "../models/user/user";

@Component({
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class TaskCardComponent implements OnInit {
  @Input() title?: string;
  @Input() deadline?: Date;
  @Input() image?: string;
  @Input() assignedUsers?: IUser[];

  constructor() {
  }

  ngOnInit(): void {
  }
}
