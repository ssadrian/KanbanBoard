import { IUser } from "../user/user";
import { TaskType } from "../task-type/task-type";

export interface ITask {
  lista: TaskType;
  img?: string;
  titulo: string;
  usuarios: IUser[];
  fechaFin?: Date;
}
