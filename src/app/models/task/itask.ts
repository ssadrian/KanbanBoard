import {IUser} from "../user/user";
import {TaskType} from "../task-type/task-type";

export interface ITask {
  taskType: TaskType;
  img: string | null;
  title: string;
  users: IUser[];
  deadline: Date | null;
}
