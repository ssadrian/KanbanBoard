import { IUser } from "../user/user";
import { TaskType } from "../task-type/task-type";

export interface ITask {
  id: number;
  lista: TaskType;
  img?: string;
  titulo: string;
  usuarios: IUser[];
  fechaFin?: Date;
}
