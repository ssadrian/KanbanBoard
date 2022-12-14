import { IUser } from "./iuser";
import { TaskType } from "./task-type";

export interface ITask {
  id: number;
  lista: TaskType;
  img?: string;
  titulo: string;
  usuarios: IUser[];
  fechaFin?: Date;
}
