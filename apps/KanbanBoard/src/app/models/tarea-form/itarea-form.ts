import { TaskType } from "../task-type/task-type";
import { IUser } from "../user/user";

export interface ITareaForm {
  titulo: string;
  listas: TaskType[];
  fechaFin?: Date;
  img?: string;
  usuarios: IUser[];
}
