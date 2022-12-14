import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TaskType} from "../models/task-type";
import {IUser} from "../models/iuser";
import {ITask} from "../models/itask";

@Component({
  selector: "task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"],
})
export class TaskFormComponent implements OnInit {
  taskTypes: string[] = Object.values(TaskType).filter((x: string) => isNaN(Number(x)));

  @Input() task?: ITask;
  @Output() onTaskSave: EventEmitter<ITask> = new EventEmitter<ITask>();
  @Output() onFormExit: EventEmitter<void> = new EventEmitter<void>();

  taskFormGroup = this.fb.nonNullable.group({
    id: [0],
    title: ["", Validators.required],
    taskType: new FormControl<TaskType>(TaskType.TODO, [Validators.required]),
    deadline: new FormControl(new Date()),
    headerImage: ["https://picsum.photos/200/300"],
    users: new FormControl(Array.of<IUser>()),
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.task === undefined) {
      return;
    }

    this.taskFormGroup.patchValue({
      id: this.task.id,
      title: this.task.titulo,
      taskType: this.task.lista,
      deadline: this.task.fechaFin,
      headerImage: this.task.img,
      users: this.task.usuarios
    });
  }

  taskFormSubmit(): void {
    let formValue
      = this.taskFormGroup.value;

    if (this.taskFormGroup.valid) {
      this.onTaskSave.emit({
        id: formValue.id!,
        titulo: formValue.title!,
        fechaFin: formValue.deadline!,
        lista: formValue.taskType!,
        img: formValue.headerImage!,
        usuarios: formValue.users!,
      });
    }
  }

  addNewUserToTask(): void {
    if (this.taskFormGroup.value.users === undefined || this.taskFormGroup.value.users === null) {
      this.taskFormGroup.value.users = Array.of<IUser>();
    }

    let newUser: IUser = {
      img: "https://picsum.photos/200/300",
      alt: "User",
      email: `${this.#getStringRandomNumber()}@${this.#getStringRandomNumber()}.com`,
      nick: this.#getStringRandomNumber(),
    };

    this.taskFormGroup.value.users.push(newUser);
  }

  removeUserFromTaskAtIndex(index: number): void {
    this.taskFormGroup.value.users!.splice(index, 1);
  }

  exitForm(): void {
    this.onFormExit.emit();
  }

  #getStringRandomNumber(): string {
    return Math.round(Math.random() * 1000 + 1).toString();
  }
}
