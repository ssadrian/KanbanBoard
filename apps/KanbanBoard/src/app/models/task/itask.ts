import {IUser} from "../user/user";
import {TaskType} from "../task-type/task-type";

export interface ITask {
  taskType: TaskType;
  img?: string;
  title: string;
  users: IUser[];
  deadline?: Date;
}
